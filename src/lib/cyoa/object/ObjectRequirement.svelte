<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import type { Object, Requireds, Row } from '$lib/store/types';
	import { KeyRound } from 'lucide-svelte';
	import Requirement from '../row/Requirement.svelte';
	import { app } from '$lib/store/store.svelte';
	import WrappedSelect from '$lib/components/wrapped/WrappedSelect.svelte';
	import WrappedInput from '$lib/components/wrapped/WrappedInput.svelte';

	const { required, obj }: { required: Requireds; obj: Object | Row } = $props();

	let modal = $state<'none' | 'appRequirement'>('none');
	const pointReqOperators = [
		{ name: '+ More than', value: '1' },
		{ name: '+= More or equal', value: '2' },
		{ name: '= Equal to', value: '3' },
		{ name: '-= Less or equal', value: '4' },
		{ name: '- Less than', value: '5' }
	];
</script>

<div>
	<Button onclick={() => (modal = 'appRequirement')} size="icon" variant="ghost">
		<KeyRound />
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
		{#if required.type === 'id'}
			<WrappedInput
				id="object-required-id-{obj.id}-{required.id}"
				label={required.required ? 'Selected ID' : 'Not Selected ID'}
				bind:value={required.reqId}
			/>
		{:else if required.type === 'pointCompare'}
			<span class="text-center">
				{required.operator.toString() === '1' && 'A is bigger than B'}
				{required.operator.toString() === '2' && 'A is equal to B'}
				{required.operator.toString() === '3' && 'A is bigger/equal to B'}
			</span>
			<WrappedSelect
				label="Operator"
				id="object-required-operator-{obj.id}-{required.id}"
				bind:value={required.operator}
				items={pointReqOperators}
				placeholder="Operator"
			/>
			<WrappedSelect
				label="Point Type A"
				id="object-required-pointtype-{obj.id}-{required.id}"
				bind:value={required.reqId}
				items={app.pointTypes.map((typ) => ({ value: typ.id, name: typ.name }))}
				placeholder="Point Type"
			/>
			<WrappedSelect
				label="Point Type B"
				id="object-required-pointtype2-{obj.id}-{required.id}"
				bind:value={required.reqId2}
				items={app.pointTypes.map((typ) => ({ value: typ.id, name: typ.name }))}
				placeholder="Point Type"
			/>
		{:else if required.type === 'or'}
			<WrappedInput
				id="object-required-or-ornum-{obj.id}-{required.id}"
				label="X"
				bind:value={() => required.orNum ?? 1,
				(v) => (required.orNum = Math.max(0, Math.min(v, required.orRequired.length)))}
				type="number"
				min="1"
				max={required.orRequired.length}
			/>
			{#each required.orRequired as orRequired, orIndex}
				<WrappedInput
					id="object-required-or-{obj.id}-{required.id}-{orIndex}"
					label={required.required ? 'Selected Choice ID' : 'Not Selected Choice ID'}
					bind:value={orRequired.req}
					placeholder={required.required ? 'Selected ID' : 'Not Selected ID'}
				/>
			{/each}
		{/if}
		<div class="grid grid-cols-2">
			{#each required.requireds as req, index}
				<div>
					{#if req.type === 'id'}
						<WrappedInput
							id="object-required-id-{obj.id}-{required.id}-{index}"
							label={required.required ? 'Selected Choice ID' : 'Not Selected Choice ID'}
							bind:value={req.reqId}
							placeholder={required.required ? 'Selected ID' : 'Not Selected ID'}
						/>
					{:else if req.type === 'points'}
						<div>
							<WrappedSelect
								label="Operator"
								id="object-required-operator-{obj.id}-{required.id}-{index}"
								bind:value={req.operator}
								items={pointReqOperators}
								placeholder="Operator"
							/>
							<WrappedSelect
								label="Point Type"
								id="object-required-pointtype-{obj.id}-{required.id}-{index}"
								bind:value={req.reqId}
								items={app.pointTypes.map((typ) => ({ value: typ.id, name: typ.name }))}
								placeholder="Point Type"
							/>
							<WrappedInput
								id="object-required-points-{obj.id}-{required.id}-{index}"
								label={required.required ? 'More Than' : 'Less Than'}
								bind:value={required.reqPoints}
								type="number"
							/>
						</div>
					{:else if req.type === 'pointCompare'}
						<div>
							<span class="text-center">
								{req.operator.toString() === '1' && 'A is bigger than B'}
								{req.operator.toString() === '2' && 'A is equal to B'}
								{req.operator.toString() === '3' && 'A is bigger/equal to B'}
							</span>
							<WrappedSelect
								label="Point Type A"
								id="object-required-pointtype-{obj.id}-{required.id}-{index}"
								bind:value={req.reqId}
								items={app.pointTypes.map((typ) => ({ value: typ.id, name: typ.name }))}
								placeholder="Point Type"
							/>
							<WrappedSelect
								label="Point Type B"
								id="object-required-pointtype2-{obj.id}-{required.id}-{index}"
								bind:value={req.reqId2}
								items={app.pointTypes.map((typ) => ({ value: typ.id, name: typ.name }))}
								placeholder="Point Type"
							/>
						</div>
					{:else if req.type === 'or'}
						<WrappedInput
							id="object-required-or-ornum-{obj.id}-{required.id}-{index}"
							label="N"
							bind:value={() => required.orNum ?? 1,
							(v) => (required.orNum = Math.max(0, Math.min(v, required.orRequired.length)))}
							type="number"
							min="1"
							max={required.orRequired.length}
						/>
						{#each req.orRequired as orRequired, orIndex}
							<WrappedInput
								id="object-required-or-{obj.id}-{required.id}-{index}-{orIndex}"
								label={req.required ? 'Selected Choice ID' : 'Not Selected Choice ID'}
								bind:value={orRequired.req}
								placeholder={req.required ? 'Selected ID' : 'Not Selected ID'}
							/>
						{/each}
					{/if}
					<Button
						onclick={() => {
							const idx = required.requireds.indexOf(req);
							required.requireds.splice(idx, 1);
						}}
					>
						Delete
					</Button>
				</div>
			{/each}
		</div>
	</div>

	<Requirement open={modal === 'appRequirement'} onclose={() => (modal = 'none')} obj={required} />
</div>
