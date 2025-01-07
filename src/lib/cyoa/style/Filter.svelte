<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
	import { Switch } from '$lib/components/ui/switch';
	import WrappedStyle from '$lib/components/wrapped/WrappedStyle.svelte';
	import { app } from '$lib/store/store.svelte';
	import type { Object, Row } from '$lib/store/types';
	import { pi } from '$lib/store/utils';
	import ColorPicker, { ChromeVariant } from 'svelte-awesome-color-picker';

	const {
		open,
		onclose,
		obj,
		from,
		embedded
	}: { open: boolean; onclose: () => void; obj?: Object | Row; from?: string; embedded?: boolean } =
		$props();

	const styling = $derived(from === 'private' ? (obj?.styling ?? app.styling) : app.styling);
</script>

{#snippet Option(
	name: string,
	numKey: keyof typeof styling,
	boolKey: keyof typeof styling,
	suffix: string,
	isReq: boolean = false
)}
	<div class="flex flex-row items-center gap-x-1">
		<div class="flex flex-col items-end gap-y-1">
			<Label class="w-20 text-right" for="styling-{numKey}-input">{name}</Label>
			<Checkbox
				bind:checked={() => (styling[boolKey] as boolean) ?? false,
				(v) => ((styling as unknown as { [k in keyof typeof styling]: boolean })[boolKey] = v)}
				disabled={isReq && styling.reqFilterVisibleIsOn}
			/>
		</div>
		<div class="flex flex-col gap-y-1">
			<div class="flex flex-row items-center gap-x-1">
				<Input
					class="max-w-24"
					id="styling-{numKey}-input"
					type="number"
					bind:value={() => pi(styling[numKey] ?? 0),
					(v) => ((styling as unknown as { [k in keyof typeof styling]: number })[numKey] = v)}
					disabled={isReq && styling.reqFilterVisibleIsOn}
				/>
				<span>{suffix}</span>
			</div>
		</div>
	</div>
{/snippet}

<WrappedStyle
	title="Filter"
	{open}
	{onclose}
	{embedded}
	class="max-h-screen overflow-y-auto sm:max-w-[1200px]"
>
	<div class="grid gap-4 py-4">
		<div class="flex flex-col gap-y-2">
			<!-- Selected Object Filter -->
			<div>
				<h5>Filter on Choice that is selected</h5>
			</div>
			<Separator />
			<div class="mb-5">
				<div class="flex flex-row justify-around">
					<div class="grid grid-flow-col grid-rows-3 gap-x-2 gap-y-2">
						{@render Option('Blur', 'selFilterBlur', 'selFilterBlurIsOn', 'px')}
						{@render Option('Brightness', 'selFilterBright', 'selFilterBrightIsOn', '%')}
						{@render Option('Contrast', 'selFilterCont', 'selFilterContIsOn', '%')}
						{@render Option('Hue-rotate', 'selFilterHue', 'selFilterHueIsOn', 'deg')}
						{@render Option('Invert', 'selFilterInvert', 'selFilterInvertIsOn', '%')}
						{@render Option('Sepia', 'selFilterSepia', 'selFilterSepiaIsOn', '%')}
						{@render Option('Opacity', 'selFilterOpac', 'selFilterOpacIsOn', '%')}
						{@render Option('Saturate', 'selFilterSatur', 'selFilterSaturIsOn', '%')}
						{@render Option('Grayscale', 'selFilterGray', 'selFilterGrayIsOn', '%')}
					</div>
					<div class="flex flex-col gap-y-2">
						<div class="flex flex-row items-center gap-x-1">
							<Label for="styling-sel-bg-color-switch">Background Color</Label>
							<Checkbox
								bind:checked={() => styling.selBgColorIsOn ?? false,
								(v) => (styling.selBgColorIsOn = v)}
							/>
						</div>
						<ColorPicker
							bind:hex={() => styling.selFilterBgColor ?? '#70FF7EFF',
							(v) => (styling.selFilterBgColor = v)}
							components={ChromeVariant}
							sliderDirection="horizontal"
							isDialog={false}
							isAlpha
						/>
					</div>
				</div>
			</div>
			<div>
				<h5>Filter on Choice that is missing its required</h5>
			</div>
			<Separator />
			<div class="mb-5">
				<div class="flex flex-row justify-around">
					<div class="grid grid-flow-col grid-rows-3 gap-x-2 gap-y-2">
						{@render Option('Blur', 'reqFilterBlur', 'reqFilterBlurIsOn', 'px', true)}
						{@render Option('Brightness', 'reqFilterBright', 'reqFilterBrightIsOn', '%', true)}
						{@render Option('Contrast', 'reqFilterCont', 'reqFilterContIsOn', '%', true)}
						{@render Option('Hue-rotate', 'reqFilterHue', 'reqFilterHueIsOn', 'deg', true)}
						{@render Option('Invert', 'reqFilterInvert', 'reqFilterInvertIsOn', '%', true)}
						{@render Option('Sepia', 'reqFilterSepia', 'reqFilterSepiaIsOn', '%', true)}
						{@render Option('Opacity', 'reqFilterOpac', 'reqFilterOpacIsOn', '%', true)}
						{@render Option('Saturate', 'reqFilterSatur', 'reqFilterSaturIsOn', '%', true)}
						{@render Option('Grayscale', 'reqFilterGray', 'reqFilterGrayIsOn', '%', true)}
					</div>
					<div class="flex flex-col gap-y-2">
						<div class="flex flex-row items-center gap-x-1">
							<Label for="styling-sel-bg-color-switch">Background Color</Label>
							<Checkbox
								bind:checked={() => styling.reqBgColorIsOn ?? false,
								(v) => (styling.reqBgColorIsOn = v)}
								disabled={styling.reqFilterVisibleIsOn}
							/>
						</div>
						<ColorPicker
							bind:hex={() => styling.reqFilterBgColor ?? '#FFFFFFFF',
							(v) => (styling.reqFilterBgColor = v)}
							components={ChromeVariant}
							sliderDirection="horizontal"
							isDialog={false}
							isAlpha
						/>
					</div>
				</div>
				<div class="flex w-full flex-col items-center">
					<div class="flex flex-row items-center gap-x-1">
						<Label for="styling-req-filter-visible-switch">Hide The Choice Completely</Label>
						<Switch
							id="styling-req-filter-visible-switch"
							bind:checked={() => styling.reqFilterVisibleIsOn ?? false,
							(v) => (styling.reqFilterVisibleIsOn = v)}
						/>
					</div>
				</div>
			</div>
		</div>
	</div></WrappedStyle
>
