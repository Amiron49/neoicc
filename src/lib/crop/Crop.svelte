<script lang="ts">
	import { onMount, type Component, type Snippet } from 'svelte';
	import type { Ords, XYOrds, Crop, PixelCrop, PercentCrop } from './types';
	import {
		defaultCrop,
		clamp,
		areCropsEqual,
		convertToPercentCrop,
		convertToPixelCrop,
		containCrop,
		nudgeCrop
	} from './utils';
	import { cn } from '$lib/utils';

	interface EVData {
		startClientX: number;
		startClientY: number;
		startCropX: number;
		startCropY: number;
		clientX: number;
		clientY: number;
		isResize: boolean;
		ord?: Ords;
	}

	interface Rectangle {
		x: number;
		y: number;
		width: number;
		height: number;
	}

	const DOC_MOVE_OPTS = { capture: true, passive: false };

	const {
		ariaLabels = {
			cropArea: 'Use the arrow keys to move the crop selection area',
			nwDragHandle:
				'Use the arrow keys to move the north west drag handle to change the crop selection area',
			nDragHandle:
				'Use the up and down arrow keys to move the north drag handle to change the crop selection area',
			neDragHandle:
				'Use the arrow keys to move the north east drag handle to change the crop selection area',
			eDragHandle:
				'Use the up and down arrow keys to move the east drag handle to change the crop selection area',
			seDragHandle:
				'Use the arrow keys to move the south east drag handle to change the crop selection area',
			sDragHandle:
				'Use the up and down arrow keys to move the south drag handle to change the crop selection area',
			swDragHandle:
				'Use the arrow keys to move the south west drag handle to change the crop selection area',
			wDragHandle:
				'Use the up and down arrow keys to move the west drag handle to change the crop selection area'
		},
		aspect,
		class: className,
		children,
		circularCrop,
		crop,
		disabled,
		locked,
		keepSelection,
		minWidth,
		minHeight,
		maxWidth,
		maxHeight,
		onchange,
		oncomplete,
		ondragstart,
		ondragend,
		renderSelectionAddon,
		ruleOfThirds,
		style
	}: {
		/** An object of labels to override the built-in English ones */
		ariaLabels?: {
			cropArea: string;
			nwDragHandle: string;
			nDragHandle: string;
			neDragHandle: string;
			eDragHandle: string;
			seDragHandle: string;
			sDragHandle: string;
			swDragHandle: string;
			wDragHandle: string;
		};
		/** The aspect ratio of the crop, e.g. `1` for a square or `16 / 9` for landscape. */
		aspect?: number;
		/** Classes to pass to the `Crop` element. */
		class?: string;
		/** The elements that you want to perform a crop on. For example an image or video. */
		children?: Snippet;
		/** Show the crop area as a circle. If your aspect is not 1 (a square) then the circle will be warped into an oval shape. Defaults to false. */
		circularCrop?: boolean;
		/** Since v10 all crop params are required except for aspect. Omit the entire crop object if you don't want a crop. See README on how to create an aspect crop with a % crop. */
		crop?: Crop;
		/** If true then the user cannot resize or draw a new crop. A class of `Crop--disabled` is also added to the container for user styling. */
		disabled?: boolean;
		/** If true then the user cannot create or resize a crop, but can still drag the existing crop around. A class of `Crop--locked` is also added to the container for user styling. */
		locked?: boolean;
		/** If true is passed then selection can't be disabled if the user clicks outside the selection area. */
		keepSelection?: boolean;
		/** A minimum crop width, in pixels. */
		minWidth?: number;
		/** A minimum crop height, in pixels. */
		minHeight?: number;
		/** A maximum crop width, in pixels. */
		maxWidth?: number;
		/** A maximum crop height, in pixels. */
		maxHeight?: number;
		/** A callback which happens for every change of the crop. You should set the crop to state and pass it back into the library via the `crop` prop. */
		onchange: (crop: PixelCrop, percentageCrop: PercentCrop) => void;
		/** A callback which happens after a resize, drag, or nudge. Passes the current crop state object in pixels and percent. */
		oncomplete?: (crop: PixelCrop, percentageCrop: PercentCrop) => void;
		/** A callback which happens when a user starts dragging or resizing. It is convenient to manipulate elements outside this component. */
		ondragstart?: (e: PointerEvent) => void;
		/** A callback which happens when a user releases the cursor or touch after dragging or resizing. */
		ondragend?: (e: PointerEvent) => void;
		/** Render a custom element in crop selection. */
		renderSelectionAddon?: (state: CropState) => Component;
		/** Show rule of thirds lines in the cropped area. Defaults to false. */
		ruleOfThirds?: boolean;
		/** Inline styles object to be passed to the `Crop` element. */
		style?: string;
	} = $props();

	type CropState = {
		cropIsActive: boolean;
		newCropIsBeingDrawn: boolean;
	};

	const xOrds = ['e', 'w'];
	const yOrds = ['n', 's'];
	const xyOrds = ['nw', 'ne', 'se', 'sw'];

	const nudgeStep = 1;
	const nudgeStepMedium = 10;
	const nudgeStepLarge = 100;

	let docMoveBound = $state(false);
	let mouseDownOnCrop = $state(false);
	let dragStarted = $state(false);
	let evData = $state<EVData>({
		startClientX: 0,
		startClientY: 0,
		startCropX: 0,
		startCropY: 0,
		clientX: 0,
		clientY: 0,
		isResize: true
	});
	let componentRef = $state<HTMLDivElement | null>(null);
	let mediaRef = $state<HTMLDivElement | null>(null);
	const instanceID = `rc-${(Math.random() * 10e15).toString(16)}`;
	let cropState = $state<CropState>({
		cropIsActive: false,
		newCropIsBeingDrawn: false
	});

	// We unfortunately get the bounding box every time as x+y changes
	// due to scrolling.
	function getBox(): Rectangle {
		if (!mediaRef) {
			return { x: 0, y: 0, width: 0, height: 0 };
		}
		const { x, y, width, height } = mediaRef.getBoundingClientRect();
		return { x, y, width, height };
	}

	let hasCrop = !!crop;
	$effect(() => {
		// Useful for when programmatically setting a new
		// crop and wanting to show a preview.
		if (oncomplete && !hasCrop && crop) {
			const { width, height } = getBox();
			if (width && height) {
				oncomplete(
					convertToPixelCrop(crop, width, height),
					convertToPercentCrop(crop, width, height)
				);
			}
		}
		hasCrop = !!crop;
	});

	function bindDocMove() {
		if (docMoveBound) {
			return;
		}

		document.addEventListener('pointermove', onDocPointerMove, DOC_MOVE_OPTS);
		document.addEventListener('pointerup', onDocPointerDone, DOC_MOVE_OPTS);
		document.addEventListener('pointercancel', onDocPointerDone, DOC_MOVE_OPTS);

		docMoveBound = true;
	}

	function unbindDocMove() {
		if (!docMoveBound) {
			return;
		}

		document.removeEventListener('pointermove', onDocPointerMove, DOC_MOVE_OPTS);
		document.removeEventListener('pointerup', onDocPointerDone, DOC_MOVE_OPTS);
		document.removeEventListener('pointercancel', onDocPointerDone, DOC_MOVE_OPTS);

		docMoveBound = false;
	}

	onMount(() => {
		return () => {
			unbindDocMove();
		};
	});

	function onCropPointerDown(e: PointerEvent) {
		const box = getBox();

		if (!crop) {
			return;
		}

		const pixelCrop = convertToPixelCrop(crop, box.width, box.height);

		if (disabled) {
			return;
		}

		if (e.cancelable) e.preventDefault(); // Stop drag selection.

		// Bind to doc to follow movements outside of element.
		bindDocMove();

		// Focus for detecting keypress.
		(componentRef as HTMLDivElement).focus({ preventScroll: true });

		const ord = (e.target as HTMLElement).dataset.ord as Ords;
		const isResize = Boolean(ord);
		let startClientX = e.clientX;
		let startClientY = e.clientY;
		let startCropX = pixelCrop.x;
		let startCropY = pixelCrop.y;

		// Set the starting coords to the opposite corner.
		if (ord) {
			const relativeX = e.clientX - box.x;
			const relativeY = e.clientY - box.y;
			let fromCornerX = 0;
			let fromCornerY = 0;

			if (ord === 'ne' || ord == 'e') {
				fromCornerX = relativeX - (pixelCrop.x + pixelCrop.width);
				fromCornerY = relativeY - pixelCrop.y;
				startCropX = pixelCrop.x;
				startCropY = pixelCrop.y + pixelCrop.height;
			} else if (ord === 'se' || ord === 's') {
				fromCornerX = relativeX - (pixelCrop.x + pixelCrop.width);
				fromCornerY = relativeY - (pixelCrop.y + pixelCrop.height);
				startCropX = pixelCrop.x;
				startCropY = pixelCrop.y;
			} else if (ord === 'sw' || ord == 'w') {
				fromCornerX = relativeX - pixelCrop.x;
				fromCornerY = relativeY - (pixelCrop.y + pixelCrop.height);
				startCropX = pixelCrop.x + pixelCrop.width;
				startCropY = pixelCrop.y;
			} else if (ord === 'nw' || ord == 'n') {
				fromCornerX = relativeX - pixelCrop.x;
				fromCornerY = relativeY - pixelCrop.y;
				startCropX = pixelCrop.x + pixelCrop.width;
				startCropY = pixelCrop.y + pixelCrop.height;
			}

			startClientX = startCropX + box.x + fromCornerX;
			startClientY = startCropY + box.y + fromCornerY;
		}

		evData = {
			startClientX,
			startClientY,
			startCropX,
			startCropY,
			clientX: e.clientX,
			clientY: e.clientY,
			isResize,
			ord
		};

		mouseDownOnCrop = true;
		cropState = { cropIsActive: true, newCropIsBeingDrawn: cropState.newCropIsBeingDrawn };
	}

	function onComponentPointerDown(e: PointerEvent) {
		const box = getBox();

		if (disabled || locked || (keepSelection && crop)) {
			return;
		}

		if (e.cancelable) e.preventDefault(); // Stop drag selection.

		// Bind to doc to follow movements outside of element.
		bindDocMove();

		// Focus for detecting keypress.
		(componentRef as HTMLDivElement).focus({ preventScroll: true });

		const cropX = e.clientX - box.x;
		const cropY = e.clientY - box.y;
		const nextCrop: PixelCrop = {
			unit: 'px',
			x: cropX,
			y: cropY,
			width: 0,
			height: 0
		};

		evData = {
			startClientX: e.clientX,
			startClientY: e.clientY,
			startCropX: cropX,
			startCropY: cropY,
			clientX: e.clientX,
			clientY: e.clientY,
			isResize: true
		};

		mouseDownOnCrop = true;

		onchange(
			convertToPixelCrop(nextCrop, box.width, box.height),
			convertToPercentCrop(nextCrop, box.width, box.height)
		);

		cropState = { cropIsActive: true, newCropIsBeingDrawn: true };
	}

	function onDocPointerMove(e: PointerEvent) {
		const box = getBox();

		if (disabled || !crop || !mouseDownOnCrop) {
			return;
		}

		// Stop drag selection.
		if (e.cancelable) e.preventDefault();

		if (!dragStarted) {
			dragStarted = true;
			ondragstart?.(e);
		}

		// Update pointer position.
		evData.clientX = e.clientX;
		evData.clientY = e.clientY;

		let nextCrop;

		if (evData.isResize) {
			nextCrop = resizeCrop();
		} else {
			nextCrop = dragCrop();
		}

		if (!areCropsEqual(crop, nextCrop)) {
			onchange(
				convertToPixelCrop(nextCrop, box.width, box.height),
				convertToPercentCrop(nextCrop, box.width, box.height)
			);
		}
	}

	function onComponentKeyDown(e: KeyboardEvent) {
		if (disabled) {
			return;
		}

		const keyCode = e.key;
		let nudged = false;

		if (!crop) {
			return;
		}

		const box = getBox();
		const nextCrop = makePixelCrop(box);
		const ctrlCmdPressed = navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey;
		const newNudgeStep = ctrlCmdPressed ? nudgeStepLarge : e.shiftKey ? nudgeStepMedium : nudgeStep;

		if (keyCode === 'ArrowLeft') {
			nextCrop.x -= newNudgeStep;
			nudged = true;
		} else if (keyCode === 'ArrowRight') {
			nextCrop.x += newNudgeStep;
			nudged = true;
		} else if (keyCode === 'ArrowUp') {
			nextCrop.y -= newNudgeStep;
			nudged = true;
		} else if (keyCode === 'ArrowDown') {
			nextCrop.y += newNudgeStep;
			nudged = true;
		}

		if (nudged) {
			if (e.cancelable) e.preventDefault(); // Stop drag selection.

			nextCrop.x = clamp(nextCrop.x, 0, box.width - nextCrop.width);
			nextCrop.y = clamp(nextCrop.y, 0, box.height - nextCrop.height);

			const pixelCrop = convertToPixelCrop(nextCrop, box.width, box.height);
			const percentCrop = convertToPercentCrop(nextCrop, box.width, box.height);

			onchange(pixelCrop, percentCrop);
			oncomplete?.(pixelCrop, percentCrop);
		}
	}

	function onHandlerKeyDown(e: KeyboardEvent, ord: Ords) {
		const box = getBox();

		if (disabled || !crop) {
			return;
		}

		// Keep the event from bubbling up to the container
		if (
			e.key === 'ArrowUp' ||
			e.key === 'ArrowDown' ||
			e.key === 'ArrowLeft' ||
			e.key === 'ArrowRight'
		) {
			e.stopPropagation();
			e.preventDefault();
		} else {
			return;
		}

		const ctrlCmdPressed = navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey;
		const offset = ctrlCmdPressed ? nudgeStepLarge : e.shiftKey ? nudgeStepMedium : nudgeStep;

		const pixelCrop = convertToPixelCrop(crop, box.width, box.height);
		const nudgedCrop = nudgeCrop(pixelCrop, e.key, offset, ord);
		const containedCrop = containCrop(
			nudgedCrop,
			aspect ?? 0,
			ord,
			box.width,
			box.height,
			minWidth,
			minHeight,
			maxWidth,
			maxHeight
		);

		if (!areCropsEqual(crop, containedCrop)) {
			const percentCrop = convertToPercentCrop(containedCrop, box.width, box.height);
			onchange(containedCrop, percentCrop);
			oncomplete?.(containedCrop, percentCrop);
		}
	}

	function onDocPointerDone(e: PointerEvent) {
		const box = getBox();

		unbindDocMove();

		if (disabled || !crop) {
			return;
		}

		if (mouseDownOnCrop) {
			mouseDownOnCrop = false;
			dragStarted = false;

			ondragend?.(e);
			oncomplete?.(
				convertToPixelCrop(crop, box.width, box.height),
				convertToPercentCrop(crop, box.width, box.height)
			);

			cropState = { cropIsActive: false, newCropIsBeingDrawn: false };
		}
	}

	function onDragFocus() {
		componentRef?.scrollTo(0, 0);
	}

	function getCropStyle() {
		if (!crop) {
			return undefined;
		}
		return `top: ${crop.y}${crop.unit}; left: ${crop.x}${crop.unit}; width: ${crop.width}${crop.unit}; height: ${crop.height}${crop.unit};`;
	}

	function dragCrop() {
		const box = getBox();
		const nextCrop = makePixelCrop(box);
		const xDiff = evData.clientX - evData.startClientX;
		const yDiff = evData.clientY - evData.startClientY;

		nextCrop.x = clamp(evData.startCropX + xDiff, 0, box.width - nextCrop.width);
		nextCrop.y = clamp(evData.startCropY + yDiff, 0, box.height - nextCrop.height);

		return nextCrop;
	}

	function getPointRegion(
		box: Rectangle,
		origOrd: Ords | undefined,
		minWidth: number,
		minHeight: number
	): XYOrds {
		const relativeX = evData.clientX - box.x;
		const relativeY = evData.clientY - box.y;

		let topHalf: boolean;
		if (minHeight && origOrd) {
			// Uses orig ord (never flip when minHeight != 0)
			topHalf = origOrd === 'nw' || origOrd === 'n' || origOrd === 'ne';
		} else {
			topHalf = relativeY < evData.startCropY;
		}

		let leftHalf: boolean;
		if (minWidth && origOrd) {
			// Uses orig ord (never flip when minWidth != 0)
			leftHalf = origOrd === 'nw' || origOrd === 'w' || origOrd === 'sw';
		} else {
			leftHalf = relativeX < evData.startCropX;
		}

		if (leftHalf) {
			return topHalf ? 'nw' : 'sw';
		} else {
			return topHalf ? 'ne' : 'se';
		}
	}

	function resolveMinDimensions(box: Rectangle, aspect: number, minWidth = 0, minHeight = 0) {
		const mw = Math.min(minWidth, box.width);
		const mh = Math.min(minHeight, box.height);

		if (!aspect || (!mw && !mh)) {
			return [mw, mh];
		}

		if (aspect > 1) {
			return mw ? [mw, mw / aspect] : [mh * aspect, mh];
		} else {
			return mh ? [mh * aspect, mh] : [mw, mw / aspect];
		}
	}

	function resizeCrop() {
		const box = getBox();
		const [newMinWidth, newMinHeight] = resolveMinDimensions(box, aspect ?? 0, minWidth, minHeight);
		let nextCrop = makePixelCrop(box);
		const area = getPointRegion(box, evData.ord, newMinWidth, newMinHeight);
		const ord = evData.ord || area;
		let xDiff = evData.clientX - evData.startClientX;
		let yDiff = evData.clientY - evData.startClientY;

		// When min dimensions are set, ensure crop isn't dragged when going beyond the other side
		if ((newMinWidth && ord === 'nw') || ord === 'w' || ord === 'sw') {
			xDiff = Math.min(xDiff, -newMinWidth);
		}

		if ((newMinHeight && ord === 'nw') || ord === 'n' || ord === 'ne') {
			yDiff = Math.min(yDiff, -newMinHeight);
		}

		const tmpCrop: PixelCrop = {
			unit: 'px',
			x: 0,
			y: 0,
			width: 0,
			height: 0
		};

		if (area === 'ne') {
			tmpCrop.x = evData.startCropX;
			tmpCrop.width = xDiff;

			if (aspect) {
				tmpCrop.height = tmpCrop.width / aspect;
				tmpCrop.y = evData.startCropY - tmpCrop.height;
			} else {
				tmpCrop.height = Math.abs(yDiff);
				tmpCrop.y = evData.startCropY - tmpCrop.height;
			}
		} else if (area === 'se') {
			tmpCrop.x = evData.startCropX;
			tmpCrop.y = evData.startCropY;
			tmpCrop.width = xDiff;

			if (aspect) {
				tmpCrop.height = tmpCrop.width / aspect;
			} else {
				tmpCrop.height = yDiff;
			}
		} else if (area === 'sw') {
			tmpCrop.x = evData.startCropX + xDiff;
			tmpCrop.y = evData.startCropY;
			tmpCrop.width = Math.abs(xDiff);

			if (aspect) {
				tmpCrop.height = tmpCrop.width / aspect;
			} else {
				tmpCrop.height = yDiff;
			}
		} else if (area === 'nw') {
			tmpCrop.x = evData.startCropX + xDiff;
			tmpCrop.width = Math.abs(xDiff);

			if (aspect) {
				tmpCrop.height = tmpCrop.width / aspect;
				tmpCrop.y = evData.startCropY - tmpCrop.height;
			} else {
				tmpCrop.height = Math.abs(yDiff);
				tmpCrop.y = evData.startCropY + yDiff;
			}
		}

		const containedCrop = containCrop(
			tmpCrop,
			aspect ?? 0,
			area,
			box.width,
			box.height,
			newMinWidth,
			newMinHeight,
			maxWidth,
			maxHeight
		);

		// Apply x/y/width/height changes depending on ordinate (fixed aspect always applies both).
		if (aspect || xyOrds.indexOf(ord) > -1) {
			nextCrop = containedCrop;
		} else if (xOrds.indexOf(ord) > -1) {
			nextCrop.x = containedCrop.x;
			nextCrop.width = containedCrop.width;
		} else if (yOrds.indexOf(ord) > -1) {
			nextCrop.y = containedCrop.y;
			nextCrop.height = containedCrop.height;
		}

		// When drawing a new crop with min dimensions we allow flipping, but ensure we don't flip outside the crop area, just ignore those.
		nextCrop.x = clamp(nextCrop.x, 0, box.width - nextCrop.width);
		nextCrop.y = clamp(nextCrop.y, 0, box.height - nextCrop.height);

		return nextCrop;
	}

	function makePixelCrop(box: Rectangle) {
		const newCrop = { ...defaultCrop, ...(crop || {}) };
		return convertToPixelCrop(newCrop, box.width, box.height);
	}

	const cropStyle = $derived(getCropStyle());
</script>

<div
	bind:this={componentRef}
	class={cn(
		'Crop',
		className,
		cropState.cropIsActive && 'Crop--active',
		disabled && 'Crop--disabled',
		locked && 'Crop--locked',
		cropState.newCropIsBeingDrawn && 'Crop--new-crop',
		crop && aspect && 'Crop--fixed-aspect',
		crop && circularCrop && 'Crop--circular-crop',
		crop && ruleOfThirds && 'Crop--rule-of-thirds',
		!dragStarted && crop && !crop.width && !crop.height && 'Crop--invisible-crop',
		circularCrop && 'Crop--no-animate'
	)}
	{style}
>
	<div bind:this={mediaRef} class="Crop__child-wrapper" onpointerdown={onComponentPointerDown}>
		{@render children?.()}
	</div>
	{#if crop}
		<svg class="Crop__crop-mask" width="100%" height="100%">
			<defs>
				<mask id={`hole-${instanceID}`}>
					<rect width="100%" height="100%" fill="white" />
					{#if circularCrop}
						<ellipse
							cx="{crop.x + crop.width / 2}{crop.unit}"
							cy="{crop.y + crop.height / 2}{crop.unit}"
							rx="{crop.width / 2}{crop.unit}"
							ry="{crop.height / 2}{crop.unit}"
							fill="black"
						/>
					{:else}
						<rect
							x="{crop.x}{crop.unit}"
							y="{crop.y}{crop.unit}"
							width="{crop.width}{crop.unit}"
							height="{crop.height}{crop.unit}"
							fill="black"
						/>
					{/if}
				</mask>
			</defs>
			<rect
				fill="black"
				fill-opacity={0.5}
				width="100%"
				height="100%"
				mask="url(#hole-{instanceID})"
			/>
		</svg>

		<div
			style={cropStyle}
			class="Crop__crop-selection"
			onpointerdown={onCropPointerDown}
			aria-label={ariaLabels.cropArea}
			tabindex={0}
			onkeydown={onComponentKeyDown}
			role="button"
		>
			{#if !disabled && !locked}
				<div class="Crop__drag-elements" onfocus={onDragFocus}>
					<div class="Crop__drag-bar ord-n" data-ord="n"></div>
					<div class="Crop__drag-bar ord-e" data-ord="e"></div>
					<div class="Crop__drag-bar ord-s" data-ord="s"></div>
					<div class="Crop__drag-bar ord-w" data-ord="w"></div>

					<div
						class="Crop__drag-handle ord-nw"
						data-ord="nw"
						tabindex={0}
						aria-label={ariaLabels.nwDragHandle}
						onkeydown={(e) => onHandlerKeyDown(e, 'nw')}
						role="button"
					></div>
					<div
						class="Crop__drag-handle ord-n"
						data-ord="n"
						tabindex={0}
						aria-label={ariaLabels.nDragHandle}
						onkeydown={(e) => onHandlerKeyDown(e, 'n')}
						role="button"
					></div>
					<div
						class="Crop__drag-handle ord-ne"
						data-ord="ne"
						tabindex={0}
						aria-label={ariaLabels.neDragHandle}
						onkeydown={(e) => onHandlerKeyDown(e, 'ne')}
						role="button"
					></div>
					<div
						class="Crop__drag-handle ord-e"
						data-ord="e"
						tabindex={0}
						aria-label={ariaLabels.eDragHandle}
						onkeydown={(e) => onHandlerKeyDown(e, 'e')}
						role="button"
					></div>
					<div
						class="Crop__drag-handle ord-se"
						data-ord="se"
						tabindex={0}
						aria-label={ariaLabels.seDragHandle}
						onkeydown={(e) => onHandlerKeyDown(e, 'se')}
						role="button"
					></div>
					<div
						class="Crop__drag-handle ord-s"
						data-ord="s"
						tabindex={0}
						aria-label={ariaLabels.sDragHandle}
						onkeydown={(e) => onHandlerKeyDown(e, 's')}
						role="button"
					></div>
					<div
						class="Crop__drag-handle ord-sw"
						data-ord="sw"
						tabindex={0}
						aria-label={ariaLabels.swDragHandle}
						onkeydown={(e) => onHandlerKeyDown(e, 'sw')}
						role="button"
					></div>
					<div
						class="Crop__drag-handle ord-w"
						data-ord="w"
						tabindex={0}
						aria-label={ariaLabels.wDragHandle}
						onkeydown={(e) => onHandlerKeyDown(e, 'w')}
						role="button"
					></div>
				</div>
			{/if}
			{#if renderSelectionAddon}
				<div class="Crop__selection-addon" onpointerdown={(e) => e.stopPropagation()}>
					{renderSelectionAddon(cropState)}
				</div>
			{/if}
			{#if ruleOfThirds}
				<div class="Crop__rule-of-thirds-hz"></div>
				<div class="Crop__rule-of-thirds-vt"></div>
			{/if}
		</div>
	{/if}
</div>

<style lang="scss">
	@use 'sass:math';

	// Query to kick us into "mobile" mode with larger drag handles/bars.
	// See: https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer
	$mobile-media-query: '(pointer: coarse)' !default;

	// Moved to resolve SASS 1.77.7 deprecation warnings
	$antWidth: 10px;
	$doubleAntWidth: 10px * 2;

	@keyframes marching-ants {
		0% {
			background-position:
				0 0,
				0 100%,
				0 0,
				100% 0;
		}
		100% {
			background-position:
				$doubleAntWidth 0,
				(-$doubleAntWidth) 100%,
				0 (-$doubleAntWidth),
				100% $doubleAntWidth;
		}
	}

	:root {
		--rc-drag-handle-size: 12px;
		--rc-drag-handle-mobile-size: 24px;
		--rc-drag-handle-bg-colour: rgba(0, 0, 0, 0.2);
		--rc-drag-bar-size: 6px; // The invisible grip size of the crop selection edges
		--rc-border-color: rgba(255, 255, 255, 0.7);
		--rc-focus-color: #0088ff;
	}

	.Crop {
		$root: &;

		position: relative;
		display: inline-block;
		cursor: crosshair;
		max-width: 100%;

		& *,
		& *::before,
		& *::after {
			box-sizing: border-box;
		}

		&--disabled,
		&--locked {
			cursor: inherit;
		}

		&__child-wrapper {
			overflow: hidden;
			max-height: inherit;

			& > img,
			& > video {
				display: block;
				max-width: 100%;
				max-height: inherit;
			}
		}

		&:not(#{$root}--disabled) {
			#{$root}__child-wrapper {
				& > img,
				& > video {
					touch-action: none;
				}
			}
			#{$root}__crop-selection {
				touch-action: none;
			}
		}

		&__crop-mask {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			pointer-events: none;
		}

		&__crop-selection {
			position: absolute;
			top: 0;
			left: 0;
			transform: translate3d(0, 0, 0);
			cursor: move;

			.Crop--disabled & {
				cursor: inherit;
			}

			.Crop--circular-crop & {
				border-radius: 50%;

				&::after {
					pointer-events: none;
					content: '';
					position: absolute;
					top: -1px;
					right: -1px;
					bottom: -1px;
					left: -1px;
					border: 1px solid var(--rc-border-color);
					opacity: 0.3;
				}
			}

			.Crop--no-animate & {
				// border: 1px dashed white;
				outline: 1px dashed white;
			}
			&:not(.Crop--no-animate &) {
				animation: marching-ants 1s;
				background-image: linear-gradient(to right, #fff 50%, #444 50%),
					linear-gradient(to right, #fff 50%, #444 50%),
					linear-gradient(to bottom, #fff 50%, #444 50%),
					linear-gradient(to bottom, #fff 50%, #444 50%);
				background-size:
					$antWidth 1px,
					$antWidth 1px,
					1px $antWidth,
					1px $antWidth;
				background-position:
					0 0,
					0 100%,
					0 0,
					100% 0;
				background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
				color: #fff;
				animation-play-state: running;
				animation-timing-function: linear;
				animation-iteration-count: infinite;
			}

			&:focus {
				outline: 2px solid var(--rc-focus-color);
				outline-offset: -1px;
			}
		}
		&--invisible-crop &__crop-mask,
		&--invisible-crop &__crop-selection {
			display: none;
		}

		&__rule-of-thirds-vt::before,
		&__rule-of-thirds-vt::after,
		&__rule-of-thirds-hz::before,
		&__rule-of-thirds-hz::after {
			content: '';
			display: block;
			position: absolute;
			background-color: rgba(255, 255, 255, 0.4);
		}

		&__rule-of-thirds-vt {
			&::before,
			&::after {
				width: 1px;
				height: 100%;
			}

			&::before {
				left: 33.3333%;
				left: calc(100% / 3);
			}

			&::after {
				left: 66.6666%;
				left: calc(100% / 3 * 2);
			}
		}

		&__rule-of-thirds-hz {
			&::before,
			&::after {
				width: 100%;
				height: 1px;
			}

			&::before {
				top: 33.3333%;
				top: calc(100% / 3);
			}

			&::after {
				top: 66.6666%;
				top: calc(100% / 3 * 2);
			}
		}

		&__drag-handle {
			position: absolute;
			width: var(--rc-drag-handle-size);
			height: var(--rc-drag-handle-size);
			background-color: var(--rc-drag-handle-bg-colour);
			border: 1px solid var(--rc-border-color);

			&:focus {
				background: var(--rc-focus-color);
			}
		}

		.ord-nw {
			top: 0;
			left: 0;
			transform: translate(-50%, -50%);
			cursor: nw-resize;
		}
		.ord-n {
			top: 0;
			left: 50%;
			transform: translate(-50%, -50%);
			cursor: n-resize;
		}
		.ord-ne {
			top: 0;
			right: 0;
			transform: translate(50%, -50%);
			cursor: ne-resize;
		}
		.ord-e {
			top: 50%;
			right: 0;
			transform: translate(50%, -50%);
			cursor: e-resize;
		}
		.ord-se {
			bottom: 0;
			right: 0;
			transform: translate(50%, 50%);
			cursor: se-resize;
		}
		.ord-s {
			bottom: 0;
			left: 50%;
			transform: translate(-50%, 50%);
			cursor: s-resize;
		}
		.ord-sw {
			bottom: 0;
			left: 0;
			transform: translate(-50%, 50%);
			cursor: sw-resize;
		}
		.ord-w {
			top: 50%;
			left: 0;
			transform: translate(-50%, -50%);
			cursor: w-resize;
		}

		// Use the same specificity as the ords above but just
		// come after.
		&__disabled &__drag-handle {
			cursor: inherit;
		}

		&__drag-bar {
			position: absolute;

			&.ord-n {
				top: 0;
				left: 0;
				width: 100%;
				height: var(--rc-drag-bar-size);
				transform: translateY(-50%);
			}
			&.ord-e {
				right: 0;
				top: 0;
				width: var(--rc-drag-bar-size);
				height: 100%;
				transform: translateX(50%);
			}
			&.ord-s {
				bottom: 0;
				left: 0;
				width: 100%;
				height: var(--rc-drag-bar-size);
				transform: translateY(50%);
			}
			&.ord-w {
				top: 0;
				left: 0;
				width: var(--rc-drag-bar-size);
				height: 100%;
				transform: translateX(-50%);
			}
		}

		&--new-crop &__drag-bar,
		&--new-crop &__drag-handle,
		&--fixed-aspect &__drag-bar {
			display: none;
		}

		&--fixed-aspect &__drag-handle.ord-n,
		&--fixed-aspect &__drag-handle.ord-e,
		&--fixed-aspect &__drag-handle.ord-s,
		&--fixed-aspect &__drag-handle.ord-w {
			display: none;
		}

		@media #{$mobile-media-query} {
			.ord-n,
			.ord-e,
			.ord-s,
			.ord-w {
				display: none;
			}

			&__drag-handle {
				width: var(--rc-drag-handle-mobile-size);
				height: var(--rc-drag-handle-mobile-size);
			}
		}
	}
</style>
