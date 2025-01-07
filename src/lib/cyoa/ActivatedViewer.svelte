<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Label } from '$lib/components/ui/label';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Textarea } from '$lib/components/ui/textarea';
	import { checkRequireds, selectedOneLess, selectedOneMore } from '$lib/store/actions';
	import { app } from '$lib/store/store.svelte';
	import { pi } from '$lib/store/utils';
	import { Check, Copy } from 'lucide-svelte';

	const { open, onclose }: { open: boolean; onclose: () => void } = $props();

	let choicesTitles = $state('');
	let copiedTitles = $state(false);
	let choicesIDs = $state('');
	let copiedIDs = $state(false);
	let newActivated = $state('');

	$effect(() => {
		const titles: string[] = [];
		const ids: string[] = [];
		for (const row of app.rows) {
			for (const object of row.objects) {
				if (!object.isSelectableMultiple && object.isActive) {
					titles.push(object.title);
					ids.push(object.id);
				} else if (object.isSelectableMultiple && object.multipleUseVariable !== 0) {
					titles.push(`${object.title} (Taken ${object.multipleUseVariable} Times)`);
					ids.push(object.id + '/ON#' + object.multipleUseVariable);
				} else if (object.isImageUpload && object.image.length > 0) {
					ids.push(object.id + '/IMG#' + object.image.replaceAll(',', '/CHAR#'));
				}
			}
		}
		choicesTitles = titles.join(', ');
		choicesIDs = ids.join(', ');
	});

	function handleCopyTitles() {
		navigator.clipboard.writeText(choicesTitles);
		copiedTitles = true;
		setTimeout(() => (copiedTitles = false), 1000);
	}

	function handleCopyIDs() {
		navigator.clipboard.writeText(choicesIDs);
		copiedIDs = true;
		setTimeout(() => (copiedIDs = false), 1000);
	}

	function handleSaveChanges() {
		const array = newActivated.split(',');
		let number = 0;
		app.activated = array;
		// For each of the rows.
		for (const row of app.rows) {
			// Turns of edit-mode on all rows.
			row.isEditModeOn = false;
			// For each of the objects in a row.
			for (const object of row.objects) {
				if (app.activated.includes(object.id)) {
					object.isActive = true;
					row.currentChoices++;

					// For each of the scores in an object.
					for (const score of object.scores) {
						for (const pointType of app.pointTypes) {
							// If the score is of this point-type.
							if (pointType.id === score.id && score.requireds.length === 0) {
								score.isActive = true;
								pointType.startingSum = pi(pointType.startingSum) - pi(score.value);
							}
						}
					}
				}
			}
		}

		// Cleans the array and imports a new one.
		for (const row of app.rows) {
			for (const object of row.objects) {
				// Check if the object is a Multiple
				if (object.isSelectableMultiple) {
					// Then check if it is in the array
					for (const el of array) {
						if (object.id === el.split('/ON#')[0]) {
							// Increment/Decrement
							number = pi(el.split('/ON#')[1]);
							if (number > 0) {
								for (let nx = 0; nx < number; nx++) {
									selectedOneMore(object);
								}
							} else if (number < 0) {
								for (let nd = 0; nd < number * -1; nd++) {
									selectedOneLess(object);
								}
							}
						}
					}
				} else if (object.isImageUpload) {
					for (const el of array) {
						if (object.id === el.split('/IMG#')[0]) {
							object.image = el.split('/IMG#')[1].replaceAll('/CHAR#', ',');
						}
					}
				}
			}
		}

		// Is needed to add points from scores with requirements after all other stuff has been done.
		for (const row of app.rows) {
			for (const object of row.objects) {
				if (app.activated.includes(object.id)) {
					for (const score of object.scores) {
						for (const pointType of app.pointTypes) {
							if (
								pointType.id === score.id &&
								score.requireds.length > 0 &&
								checkRequireds(score)
							) {
								score.isActive = true;
								pointType.startingSum = pi(pointType.startingSum) - pi(score.value);
							}
						}
					}
				}
			}
		}

		console.log(array.filter((el) => !el.includes('/ON#') && !el.includes('/IMG#')));
		onclose();
	}
</script>

<Dialog.Root {open} onOpenChange={(a) => !a && onclose()}>
	<Dialog.Content
		class="bg-repeat sm:max-w-3xl"
		style={app.styling.backgroundImage
			? `background-image: url("${app.styling.backgroundImage}"); background-color: ${app.styling.backgroundColor}; background-repeat: repeat;`
			: `background-color: ${app.styling.backgroundColor};`}
	>
		<Dialog.Header>
			<Dialog.Title>Activated Viewer</Dialog.Title>
			<Dialog.Description>Import/Export activated choices and their ID's.</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			{#if choicesTitles}
				<div>
					<Label for="activated-choices-titles">Current Activated Choices Titles</Label>
					<ScrollArea class="mb-2 max-h-32 overflow-y-auto rounded bg-white p-2">
						{choicesTitles}
					</ScrollArea>
					<Button
						id="activated-choices-titles"
						variant="ghost"
						class="relative right-0 float-right -mt-12 bg-white/30"
						size="icon"
						onclick={handleCopyTitles}
					>
						{#if copiedTitles}
							<Check />
						{:else}
							<Copy />
						{/if}
					</Button>
				</div>
			{/if}
			{#if choicesIDs}
				<div>
					<Label for="activated-choices-ids">Current Activated Choices IDs</Label>
					<ScrollArea class="mb-2 max-h-32 overflow-y-auto rounded bg-white p-2">
						{choicesIDs}
					</ScrollArea>
					<Button
						id="activated-choices-ids"
						variant="ghost"
						class="relative right-0 float-right -mt-12 bg-white/30"
						size="icon"
						onclick={handleCopyIDs}
					>
						{#if copiedIDs}
							<Check />
						{:else}
							<Copy />
						{/if}
					</Button>
				</div>
			{/if}
			<div>
				<Label for="activated-choices-textarea">Imported Choices IDs</Label>
				<Textarea
					id="activated-choices-textarea"
					placeholder="Area to import activated choices with lists of id's"
					bind:value={newActivated}
				/>
			</div>
		</div>
		<Dialog.Footer>
			<Button type="submit" onclick={handleSaveChanges}>Save changes (Clean if empty)</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
