<script lang="ts">
	import type { Row } from '$lib/store/types';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	const { open, onclose, row }: { open: boolean; onclose: () => void; row: Row } = $props();
</script>

<Dialog.Root bind:open={() => open, (a) => !a && onclose()}>
	<Dialog.Content class="sm:max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title>Choices</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<div
				class="flex max-h-[80vh] flex-col gap-y-1 overflow-y-auto py-4"
				use:dndzone={{
					items: row.objects,
					flipDurationMs: 300,
					dropTargetStyle: { outline: '' }
				}}
				onconsider={(e) => (row.objects = e.detail.items)}
				onfinalize={(e) => (row.objects = e.detail.items)}
			>
				{#each row.objects as object, index (object.id)}
					<div animate:flip={{ duration: 300 }} class="rounded border p-2">
						<!-- Show title if there is one, elsewise show the id. -->
						{index + 1}. {object.title ? object.title : object.id}
					</div>
				{/each}
			</div>
		</div>
		<Dialog.Footer>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
