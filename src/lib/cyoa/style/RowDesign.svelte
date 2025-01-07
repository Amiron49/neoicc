<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import WrappedStyle from '$lib/components/wrapped/WrappedStyle.svelte';
	import { app } from '$lib/store/store.svelte';
	import type { Object, Row } from '$lib/store/types';
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';

	const {
		open,
		onclose,
		from,
		obj,
		embedded
	}: {
		open: boolean;
		onclose: () => void;
		from?: 'private';
		obj?: Object | Row;
		embedded?: boolean;
	} = $props();

	const styling = $derived(
		from === 'private' ? (obj?.styling ?? app.styling) : app.styling
	) as typeof app.styling;
	const borderRadiusSuffix = $derived(styling.rowBorderRadiusIsPixels ? 'px' : '%');

	const borderStyles = [
		{ value: 'solid' },
		{ value: 'dotted' },
		{ value: 'dashed' },
		{ value: 'double' },
		{ value: 'groove' },
		{ value: 'ridge' },
		{ value: 'inset' },
		{ value: 'outset' },
		{ value: 'hidden' }
	];
</script>

<WrappedStyle title="Row Design" {open} {onclose} {embedded} class="sm:max-w-[1200px]">
	<div class="grid gap-4 py-4">
		<div class="flex flex-row items-center gap-x-1">
			<Switch id="row-design-advanced" bind:checked={styling.rowDesignIsAdvanced} />
			<Label for="row-design-advanced">Advanced Design?</Label>
		</div>
		{#if styling.rowDesignIsAdvanced}
			<div class="grid grid-cols-4 gap-4">
				<div class="flex flex-col gap-y-2">
					<h6>Margin and Padding</h6>
					<WrappedInput
						id="row-text-margin"
						label="Text Margin"
						bind:value={styling.rowMargin}
						type="number"
						suffix="px"
					/>
					<WrappedInput
						id="row-body-margin-sides"
						label="Row Left and Right Margin"
						bind:value={styling.rowBodyMarginSides}
						type="number"
						suffix="px"
					/>
					<WrappedInput
						id="row-body-margin-top"
						label="Row Top Margin"
						bind:value={styling.rowBodyMarginTop}
						type="number"
						suffix="px"
					/>
					<WrappedInput
						id="row-body-margin-bottom"
						label="Row Bottom Margin"
						bind:value={styling.rowBodyMarginBottom}
						type="number"
						suffix="px"
					/>
					<h6>Text Padding</h6>
					<WrappedInput
						id="row-text-padding-y"
						label="Text Left and Right Padding"
						bind:value={styling.rowTextPaddingY}
						type="number"
						suffix="px"
					/>
					<WrappedInput
						id="row-text-padding-x"
						label="Text Top and Bottom Padding"
						bind:value={styling.rowTextPaddingX}
						type="number"
						suffix="px"
					/>
					<div class="flex flex-row items-center gap-x-1">
						<Checkbox id="row-overflow" bind:checked={styling.rowOverflowIsOn} />
						<Label for="row-overflow">Border-Radius Cuts off overflow</Label>
					</div>
					<div class="flex flex-row items-center gap-x-1">
						<Checkbox id="row-gradient" bind:checked={styling.rowGradientIsOn} />
						<Label for="row-gradient">Object Gradient is turned on</Label>
					</div>
					{#if styling.rowGradientIsOn}
						<WrappedInput
							id="row-gradient"
							label="Gradient"
							bind:value={styling.rowGradient}
							placeholder="to left, blue, red"
						/>
						<span>
							You might need to leave for the main menu if things stop updating, using something
							like (green, green) works.
							<a target="_blank" href="https://www.w3schools.com/css/css3_gradients.asp">
								https://www.w3schools.com/css/css3_gradients.asp
							</a>
						</span>
					{/if}
				</div>
				<div class="flex flex-col gap-y-2">
					<h6>Shadow that the row makes</h6>
					<WrappedInput
						id="row-drop-shadow-h"
						label="Horizontal Shadow"
						bind:value={styling.rowDropShadowH}
						type="number"
						suffix="px"
					/>
					<WrappedInput
						id="row-drop-shadow-v"
						label="Vertical Shadow"
						bind:value={styling.rowDropShadowV}
						type="number"
						suffix="px"
					/>
					<WrappedInput
						id="row-drop-shadow-blur"
						label="Shadow Blur"
						bind:value={styling.rowDropShadowBlur}
						type="number"
						suffix="px"
					/>
					<WrappedInput
						id="row-drop-shadow-spread"
						label="Shadow Spread"
						bind:value={styling.rowDropShadowSpread}
						type="number"
						suffix="px"
					/>
					<h6>The Width and Height of the buttons</h6>
					<WrappedInput
						id="row-button-x-padding"
						label="Button Height"
						bind:value={styling.rowButtonXPadding}
						type="number"
						suffix="px"
					/>
					<WrappedInput
						id="row-button-y-padding"
						label="Button Width"
						bind:value={styling.rowButtonYPadding}
						type="number"
						suffix="px"
					/>
					<div class="flex flex-row items-center gap-x-1">
						<Checkbox id="row-drop-shadow-on" bind:checked={styling.rowDropShadowIsOn} />
						<Label for="row-drop-shadow-on">Drop Shadow Is turned on</Label>
					</div>
				</div>
				<div class="flex flex-col gap-y-2">
					<h6>Rounded corners on the choices</h6>
					<WrappedInput
						id="row-border-radius-top-left"
						label="Border-radius Top Left"
						bind:value={styling.rowBorderRadiusTopLeft}
						type="number"
						suffix={borderRadiusSuffix}
					/>
					<WrappedInput
						id="row-border-radius-top-right"
						label="Border-radius Top Right"
						bind:value={styling.rowBorderRadiusTopRight}
						type="number"
						suffix={borderRadiusSuffix}
					/>
					<WrappedInput
						id="row-border-radius-bottom-right"
						label="Border-radius Bottom Right"
						bind:value={styling.rowBorderRadiusBottomRight}
						type="number"
						suffix={borderRadiusSuffix}
					/>
					<WrappedInput
						id="row-border-radius-bottom-left"
						label="Border-radius Bottom Left"
						bind:value={styling.rowBorderRadiusBottomLeft}
						type="number"
						suffix={borderRadiusSuffix}
					/>
					<h6>Border Style and Width</h6>
					<WrappedSelect
						id="row-border-style"
						label="Border Styles"
						bind:value={styling.rowBorderStyle}
						items={borderStyles.map((e) => ({ value: e.value, name: e.value }))}
						placeholder="Select Style"
					/>
					<WrappedInput
						id="row-border-width"
						label="Border Width"
						bind:value={styling.rowBorderWidth}
						type="number"
						suffix="px"
					/>
					<div class="flex flex-row items-center gap-x-1">
						<Switch
							id="row-border-radius-is-pixels"
							bind:checked={styling.rowBorderRadiusIsPixels}
						/>
						<Label for="row-border-radius-is-pixels">Border-Radius Percent or Pixels?</Label>
					</div>
					<div class="flex flex-row items-center gap-x-1">
						<Checkbox id="row-border-on" bind:checked={styling.rowBorderIsOn} />
						<Label for="row-border-on">Border is turned on</Label>
					</div>
				</div>
				<div class="flex flex-col gap-y-2">
					<h6>Border Color</h6>
					<ColorPicker
						bind:hex={() => styling.rowBorderColor ?? 'red', (v) => (styling.rowBorderColor = v)}
						components={ChromeVariant}
						sliderDirection="horizontal"
						isDialog={false}
						isAlpha
					/>
					<h6>Color of the choice shadow</h6>
					<ColorPicker
						bind:hex={() => styling.rowDropShadowColor ?? 'grey',
						(v) => (styling.rowDropShadowColor = v)}
						components={ChromeVariant}
						sliderDirection="horizontal"
						isDialog={false}
						isAlpha
					/>
				</div>
			</div>
		{:else}
			<div class="grid grid-cols-5 gap-4">
				<div class="flex flex-col gap-y-2">
					<h6>Size of the row</h6>
					<WrappedInput
						id="row-margin"
						label="Width of the row top."
						bind:value={styling.rowMargin}
						type="number"
						suffix="px"
					/>
					<WrappedInput
						id="row-body-margin-sides"
						label="Space at the right and left of the rows"
						bind:value={styling.rowBodyMarginSides}
						type="number"
						suffix="%"
					/>
					<WrappedInput
						id="row-body-margin-bottom"
						label="Space Between Rows"
						bind:value={styling.rowBodyMarginBottom}
						type="number"
						suffix="px"
					/>
					<div class="flex flex-row items-center gap-x-1">
						<Checkbox id="row-border-on" bind:checked={styling.rowBorderIsOn} />
						<Label for="row-border-on">Border is turned on</Label>
					</div>
					<div class="flex flex-row items-center gap-x-1">
						<Checkbox id="row-gradient" bind:checked={styling.rowGradientIsOn} />
						<Label for="row-gradient">Object Gradient is turned on</Label>
					</div>
					{#if styling.rowGradientIsOn}
						<WrappedInput
							id="row-gradient"
							label="Gradient"
							bind:value={styling.rowGradient}
							placeholder="to left, blue, red"
						/>
						<span>
							You might need to leave for the main menu if things stop updating, using something
							like (green, green) works.
							<a target="_blank" href="https://www.w3schools.com/css/css3_gradients.asp">
								https://www.w3schools.com/css/css3_gradients.asp
							</a>
						</span>
					{/if}
				</div>
				<div class="flex flex-col gap-y-2">
					<h6>Padding of the text inside of row</h6>
					<WrappedInput
						id="row-text-padding-y"
						label="Text Left and Right Padding"
						bind:value={styling.rowTextPaddingY}
						type="number"
						suffix="px"
					/>
					<WrappedInput
						id="row-text-padding-x"
						label="Text Top and Bottom Padding"
						bind:value={styling.rowTextPaddingX}
						type="number"
						suffix="px"
					/>
					<h6>Shadow that the choice makes</h6>
					<WrappedInput
						id="row-drop-shadow-h"
						label="The Higher the number the bigger the shadow will be."
						bind:value={() => styling.rowDropShadowH,
						(v) => {
							styling.rowDropShadowV = v;
							styling.rowDropShadowV = v;
							styling.rowDropShadowSpread = v;
							styling.rowDropShadowBlur = v;
						}}
						type="number"
						suffix="px"
					/>
					<div class="flex flex-row items-center gap-x-1">
						<Checkbox id="row-drop-shadow-on" bind:checked={styling.rowDropShadowIsOn} />
						<Label for="row-drop-shadow-on">Drop Shadow Is turned on</Label>
					</div>
				</div>
				<div class="flex flex-col gap-y-2">
					<h6>Style and Width of the border</h6>
					<WrappedSelect
						id="row-border-style"
						label="Border Styles"
						bind:value={styling.rowBorderStyle}
						items={borderStyles.map((e) => ({ value: e.value, name: e.value }))}
						placeholder="Select Style"
					/>
					<WrappedInput
						id="row-border-width"
						label="Border Width"
						bind:value={styling.rowBorderWidth}
						type="number"
						suffix="px"
					/>
					<h6>Rounded corners on the choices</h6>
					<WrappedInput
						id="row-border-radius-top-left"
						label="Rounded corners in the top of each row"
						bind:value={() => styling.rowBorderRadiusTopLeft,
						(v) => {
							styling.rowBorderRadiusTopLeft = v;
							styling.rowBorderRadiusTopRight = v;
						}}
						placeholder="0"
						type="number"
						suffix={borderRadiusSuffix}
					/>
					<WrappedInput
						id="row-border-radius-bottom-left"
						label="Rounded corners in the bottom of each row"
						bind:value={() => styling.rowBorderRadiusBottomLeft,
						(v) => {
							styling.rowBorderRadiusBottomLeft = v;
							styling.rowBorderRadiusBottomRight = v;
						}}
						placeholder="0"
						type="number"
						suffix={borderRadiusSuffix}
					/>
				</div>
				<div class="flex flex-col gap-y-2">
					<h6>Border Color</h6>
					<ColorPicker
						bind:hex={() => styling.rowBorderColor ?? 'red', (v) => (styling.rowBorderColor = v)}
						components={ChromeVariant}
						sliderDirection="horizontal"
						isDialog={false}
						isAlpha
					/>
				</div>
				<div class="flex flex-col gap-y-2">
					<h6>Color of the choice shadow</h6>
					<ColorPicker
						bind:hex={() => styling.rowDropShadowColor ?? 'grey',
						(v) => (styling.rowDropShadowColor = v)}
						components={ChromeVariant}
						sliderDirection="horizontal"
						isDialog={false}
						isAlpha
					/>
				</div>
			</div>
		{/if}
	</div>
</WrappedStyle>
