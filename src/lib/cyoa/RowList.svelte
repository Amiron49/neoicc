<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { app } from '$lib/store/store.svelte';
	import DOMPurify from 'dompurify';
	import * as Accordion from '$lib/components/ui/accordion';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';

	const { open, onclose }: { open: boolean; onclose: () => void } = $props();
</script>

<Dialog.Root bind:open={() => open, (a) => !a && onclose()}>
	<Dialog.Content class="sm:max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title>Rows</Dialog.Title>
		</Dialog.Header>
		<div class="grid gap-4 py-4">
			<Accordion.Root type="multiple">
				<div
					class="flex max-h-[80vh] flex-col gap-y-1 overflow-y-auto py-4"
					use:dndzone={{
						items: app.rows,
						flipDurationMs: 300,
						dropTargetStyle: { outline: '' }
					}}
					onconsider={(e) => (app.rows = e.detail.items)}
					onfinalize={(e) => (app.rows = e.detail.items)}
				>
					{#each app.rows as row, index (row.id)}
						<div animate:flip={{ duration: 300 }}>
							<Accordion.Item class="rounded border p-2">
								<Accordion.Trigger class="p-0" draggable={true}>
									<!-- Show title if there is one, elsewise show the id. -->
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{index + 1}. {@html DOMPurify.sanitize(row.title ? row.title : row.id)}
								</Accordion.Trigger>
								<Accordion.Content class="pt-2">
									<div class="flex flex-col gap-y-1">
										{#each row.objects as object, idx}
											<div
												class="flex flex-row items-center justify-between rounded border px-2 py-1"
											>
												<p>
													<!-- Show title if there is one, elsewise show the id. -->
													<!-- eslint-disable-next-line svelte/no-at-html-tags -->
													{@html DOMPurify.sanitize(object.title ? object.title : object.id)}
												</p>
												<div class="flex flex-row gap-x-2">
													<Button
														variant="ghost"
														size="icon"
														onclick={() => {
															if (idx > 0) {
																let el = row.objects[idx];
																row.objects[idx] = row.objects[idx - 1];
																row.objects[idx - 1] = el;
															}
														}}
													>
														<ChevronUp />
													</Button>
													<Button
														variant="ghost"
														size="icon"
														onclick={() => {
															if (idx < row.objects.length - 1) {
																let el = row.objects[idx];
																row.objects[idx] = row.objects[idx + 1];
																row.objects[idx + 1] = el;
															}
														}}
													>
														<ChevronDown />
													</Button>
												</div>
											</div>
										{/each}
									</div>
								</Accordion.Content>
							</Accordion.Item>
						</div>
					{/each}
				</div>
			</Accordion.Root>
		</div>
		<Dialog.Footer>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
