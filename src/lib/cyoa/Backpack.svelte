<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { app } from '$lib/store/store.svelte';
	import { generateID } from '$lib/store/utils';
	import Row from './Row.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import {
		Brush,
		ChevronDown,
		ChevronUp,
		Copy,
		Trash2,
		Wrench,
		type Icon as LucideIcon
	} from 'lucide-svelte';
	import type { Backpack as BackpackType } from '$lib/store/types';
	import Backpack from './style/Backpack.svelte';

	const { open, onclose, type }: { open: boolean; onclose: () => void; type: string } = $props();

	let modal = $state<'none' | 'appBackpack'>('none');

	function createNewBackpackRow() {
		app.backpack.push({
			id: generateID(),
			title: 'The Row',
			titleText:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			objectWidth: 'col-md-3',
			image: '',
			template: '1',

			// Button in row.
			isButtonRow: false, // Does the row show an image(true) or an button(false)?
			buttonType: true, // True if permanent, false if switch.
			buttonId: '', // The id of the variable that the button uses.
			buttonText: 'Click',
			buttonRandom: false,
			buttonRandomNumber: 1,

			isResultRow: true, // Is the row a result row?
			resultGroupId: '',
			isInfoRow: true, // Is the row a information row?
			isPrivateStyling: false,

			defaultAspectWidth: 1, // The default width and height for cropper aspect.
			defaultAspectHeight: 1, // The default height for cropper aspect.
			allowedChoices: 0, // Allowed choices in the array.
			currentChoices: 0, // Current selected choices in the array.
			requireds: [],
			isEditModeOn: false,
			isRequirementOpen: false,
			objects: [],
			// The styling that has to be done in the row.
			styling: {
				// Font for the text.
				rowTitle: 'Times New Roman', // The font for the row-titles.
				rowText: 'Times New Roman', // The font for the row-under-text.
				objectTitle: 'Times New Roman', // The font for the object-titles.
				objectText: 'Times New Roman', // The font for the object-under-text.
				addonTitle: 'Times New Roman', // The font for the object-titles.
				addonText: 'Times New Roman', // The font for the object-under-text.

				// Size for the text.
				rowTitleTextSize: 200,
				rowTextTextSize: 100,
				objectTitleTextSize: 200,
				objectTextTextSize: 100,
				addonTitleTextSize: 200,
				addonTextTextSize: 100,

				rowTitleAlign: 'center',
				rowTextAlign: 'center',
				objectTitleAlign: 'center',
				objectTextAlign: 'center',
				addonTitleAlign: 'center',
				addonTextAlign: 'center',

				barTextColor: '#000000',
				barBackgroundColor: '#FFFFFFFF',
				barTextPadding: 17,
				barTextMargin: 0,
				barTextFont: 'Times New Roman',
				barTextSize: 15,
				barPadding: 0,
				barMargin: 0,

				// Colors for the text.
				rowTitleColor: '000000',
				rowTextColor: '000000',
				objectTitleColor: '000000',
				objectTextColor: '000000',
				addonTitleColor: '000000',
				addonTextColor: '000000',
				objectHeight: true,

				// Background image and color.
				backgroundImage: '',
				rowBackgroundImage: '',
				objectBackgroundImage: '',
				rowBorderImage: '',
				rowBorderImageRepeat: 'stretch',
				rowBorderImageWidth: 5,
				rowBorderImageSliceTop: 5,
				rowBorderImageSliceBottom: 5,
				rowBorderImageSliceLeft: 5,
				rowBorderImageSliceRight: 5,
				objectBorderImage: '',
				objectBorderImageRepeat: 'stretch',
				objectBorderImageWidth: 5,
				objectBorderImageSliceTop: 5,
				objectBorderImageSliceBottom: 5,
				objectBorderImageSliceLeft: 5,
				objectBorderImageSliceRight: 5,
				backgroundColor: '#FFFFFFFF',
				objectBgColor: '#FFFFFFFF',
				rowBgColor: '#FFFFFFFF',

				// Boolean that says if the row or object-color will be viewed.
				rowBgColorIsOn: false,
				objectBgColorIsOn: false,

				// Image radius and width
				rowImageBorderRadius: 0,
				objectImageBorderRadius: 0,
				objectImageWidth: 100,
				rowImageWidth: 100,

				// Margin and padding
				objectMargin: 10,
				rowMargin: 0,
				rowTextPaddingY: 1,
				rowTextPaddingX: 10,
				objectTextPadding: 10,

				rowBodyMarginTop: 1,
				rowBodyMarginBottom: 25,
				rowBodyMarginSides: 1,

				// Style Drop Shadow Object
				objectDropShadowH: 0,
				objectDropShadowV: 0,
				objectDropShadowSpread: 0,
				objectDropShadowBlur: 0,
				objectDropShadowColor: 'grey',
				objectDropShadowIsOn: false,

				// Style Drop Shadow Row
				rowDropShadowH: 0,
				rowDropShadowV: 0,
				rowDropShadowSpread: 0,
				rowDropShadowBlur: 0,
				rowDropShadowColor: 'grey',
				rowDropShadowIsOn: false,

				// Selected Filter
				selFilterBlurIsOn: false,
				selFilterBlur: 0,
				selFilterBrightIsOn: false,
				selFilterBright: 100,
				selFilterContIsOn: false,
				selFilterCont: 100,
				selFilterGrayIsOn: false,
				selFilterGray: 0,
				selFilterHueIsOn: false,
				selFilterHue: 0,
				selFilterInvertIsOn: false,
				selFilterInvert: 0,
				selFilterOpacIsOn: false,
				selFilterOpac: 100,
				selFilterSaturIsOn: false,
				selFilterSatur: 1,
				selFilterSepiaIsOn: false,
				selFilterSepia: 0,
				selBgColorIsOn: true,
				selFilterBgColor: '#70FF7EFF',

				// Required Filter
				reqFilterBlurIsOn: false,
				reqFilterBlur: 0,
				reqFilterBrightIsOn: false,
				reqFilterBright: 100,
				reqFilterContIsOn: false,
				reqFilterCont: 100,
				reqFilterGrayIsOn: false,
				reqFilterGray: 0,
				reqFilterHueIsOn: false,
				reqFilterHue: 0,
				reqFilterInvertIsOn: false,
				reqFilterInvert: 0,
				reqFilterOpacIsOn: true,
				reqFilterOpac: 50,
				reqFilterSaturIsOn: false,
				reqFilterSatur: 1,
				reqFilterSepiaIsOn: false,
				reqFilterSepia: 0,
				reqBgColorIsOn: false,
				reqFilterBgColor: '#FFFFFFFF',
				reqFilterVisibleIsOn: false // Add later
			}
		});
	}

	function cloneRow(row: BackpackType) {
		const idx = app.backpack.indexOf(row) + 1;
		app.backpack.splice(idx, 0, JSON.parse(JSON.stringify(row)));
		app.backpack[idx].id = generateID();
		for (const obj of app.backpack[idx].objects) obj.id = generateID();
	}
</script>

{#snippet TooltipIconButton(Icon: typeof LucideIcon, text: string, onclick: () => void)}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger {onclick} class={buttonVariants({ variant: 'ghost', size: 'icon' })}>
				<Icon />
			</Tooltip.Trigger>
			<Tooltip.Content>
				<span>{text}</span>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{/snippet}

<Dialog.Root bind:open={() => open, (a) => !a && onclose()}>
	<Dialog.Content class="max-h-[calc(100vh-100px)] overflow-y-auto md:w-[90%] md:max-w-[1200px]">
		<Dialog.Header>
			<Dialog.Title>Backpack</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div>
				<Button onclick={() => createNewBackpackRow()}>Add New Backpack Row</Button>
			</div>
			<div class="flex flex-row items-center gap-x-1">
				<Switch
					id="selected-choices-id-import-dialog"
					bind:checked={() => app.importedChoicesIsOpen ?? false,
					(v) => (app.importedChoicesIsOpen = v)}
				/>
				<Label for="selected-choices-id-import-dialog">
					Dialog where selected choices can be imported with ID's.
				</Label>
			</div>
			<div>
				{#each app.backpack as row, index}
					<div>
						<div class="flex flex-row justify-end rounded-t border bg-white p-2">
							{@render TooltipIconButton(
								Wrench,
								'Edit Row',
								() => (row.isEditModeOn = !row.isEditModeOn)
							)}
							{@render TooltipIconButton(Trash2, 'Delete Row', () =>
								app.backpack.splice(app.backpack.indexOf(row), 1)
							)}
							{@render TooltipIconButton(Copy, 'Clone Row', () => cloneRow(row))}
							{@render TooltipIconButton(Brush, 'Modify Row Design', () => (modal = 'appBackpack'))}
							{@render TooltipIconButton(ChevronUp, 'Move Row Up', () => {
								if (index > 0) {
									const el = app.backpack[index];
									app.backpack[index] = app.backpack[index - 1];
									app.backpack[index - 1] = el;
								}
							})}
							{@render TooltipIconButton(ChevronDown, 'Move Row Down', () => {
								if (index < app.backpack.length - 1) {
									const el = app.backpack[index];
									app.backpack[index] = app.backpack[index + 1];
									app.backpack[index + 1] = el;
								}
							})}
						</div>
						<Row {row} {type} isCreator={true} />
					</div>
				{/each}
			</div>
		</div>
		<Dialog.Footer>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<Backpack open={modal === 'appBackpack'} onclose={() => (modal = 'none')} />
