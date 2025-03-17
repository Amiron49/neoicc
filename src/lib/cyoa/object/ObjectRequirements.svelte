<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import type { Object, Requireds, Row } from '$lib/store/types';
	import { KeyRound } from 'lucide-svelte';
	import Requirement from '../row/Requirement.svelte';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';
	import ObjectRequirement from "$lib/cyoa/object/ObjectRequirement.svelte";

	const { required, obj }: { required: Requireds; obj: Object | Row } = $props();

	let modal = $state<'none' | 'appRequirement'>('none');
</script>

<div>
	<Button onclick={() => (modal = 'appRequirement')} size="icon" variant="ghost">
		<KeyRound/>
	</Button>

	<div class="flex flex-col gap-y-1 p-2">
		{#if required.type !== 'pointCompare'}
			<div class="flex flex-row items-center gap-x-1">
				<Checkbox
						id="object-required-show-required-{obj.id}-{required.id}"
						bind:checked={required.showRequired}
				/>
				<Label for="object-required-show-required-{obj.id}-{required.id}">Show Requirement</Label>
			</div>
		{/if}
		{#if required.showRequired && required.type !== 'pointCompare'}
			<WrappedInput
					id="object-required-before-text-{obj.id}-{required.id}"
					label="Text Before"
					bind:value={required.beforeText}
			/>
			<WrappedInput
					id="object-required-after-text-{obj.id}-{required.id}"
					label="Text After"
					bind:value={required.afterText}
			/>
		{/if}
		<ObjectRequirement {required} idPostfix="{obj.id}-{required.id}">
			<div class="grid grid-cols-2">

				{#each required.requireds as req, index}
					<div class="flex flex-col gap-y-1 p-2">
						<ObjectRequirement required={req} idPostfix="{obj.id}-{required.id}-{index}">
							<Button
									onclick={() => {
							const idx = required.requireds.indexOf(req);
							required.requireds.splice(idx, 1);
						}}
							>
								Delete
							</Button>
						</ObjectRequirement>
					</div>
				{/each}
			</div>
		</ObjectRequirement>

	</div>
</div>

<Requirement open={modal === 'appRequirement'} onclose={() => (modal = 'none')} obj={required}/>
