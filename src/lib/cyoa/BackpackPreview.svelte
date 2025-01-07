<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import Row from './Row.svelte';
	import { app } from '$lib/store/store.svelte';
	import { printDiv } from '$lib/utils';

	const { open, onclose, type }: { open: boolean; onclose: () => void; type: string } = $props();

	let printRef = $state<HTMLDivElement | null>(null);
</script>

<Dialog.Root {open} onOpenChange={(a) => !a && onclose()}>
	<Dialog.Content
		class="max-h-screen overflow-y-auto bg-repeat"
		style={{
			backgroundImage: app.styling.backgroundImage ? `url(${app.styling.backgroundImage})` : null,
			backgroundColor: app.styling.backgroundColor,
			maxWidth: app.styling.backPackWidth + 'px'
		}}
	>
		<Dialog.Header>
			<Dialog.Title>Backpack Preview</Dialog.Title>
			<Dialog.Description>Preview of your backpack</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<Button onclick={() => printRef && printDiv(printRef)} type="button">
				Download Image (Go all the way to the bottom to load in the pictures first)
			</Button>
			<div bind:this={printRef} class="flex flex-col">
				{#each app.backpack as row}
					<div>
						<Row {row} {type} isCreator={false} />
					</div>
				{/each}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
