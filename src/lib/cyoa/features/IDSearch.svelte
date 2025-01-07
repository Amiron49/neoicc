<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { app } from '$lib/store/store.svelte';

	const { open, onclose }: { open: boolean; onclose: () => void } = $props();
</script>

<Dialog.Root bind:open={() => open, (a) => !a && onclose()}>
	<Dialog.Content class="max-h-screen overflow-y-auto sm:max-w-[1200px]">
		<Dialog.Header>
			<Dialog.Title>ID / Name List</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<p>You can use CTRL + F to find ID's or Names.</p>
			{#each app.rows as row}
				<div>
					<b>{row.title} / {row.id}</b>
					<div>
						{#each row.objects as object}
							<p>
								{object.title} / {object.id}
							</p>
						{/each}
					</div>
				</div>
			{/each}
		</div>
		<Dialog.Footer>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
