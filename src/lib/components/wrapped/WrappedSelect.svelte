<script lang="ts">
	import { cn } from '$lib/utils';
	import { Label } from '../ui/label';
	import * as Select from '../ui/select';

	let {
		id,
		label,
		items,
		placeholder,
		triggerClass,
		hasNone,
		noLabel,
		value = $bindable()
	}: {
		id?: string;
		label?: string;
		items: { name: string; value: string }[];
		placeholder: string;
		value: string | number | undefined | null;
		triggerClass?: string;
		hasNone?: boolean;
		noLabel?: boolean;
	} = $props();

	function toS(v: string | number | undefined | null): string {
		if (v === undefined || v === null) return '';
		return v.toString();
	}
</script>

<div class="flex flex-col items-start gap-y-1">
	{#if !noLabel}
		<Label for={id}>{label}</Label>
	{/if}
	<Select.Root
		type="single"
		bind:value={() => toS(value) || (hasNone ? 'none' : toS(value)),
		(v) => (hasNone && v === 'none' ? (value = '') : (value = v))}
	>
		<Select.Trigger {id} class={cn(triggerClass)}>
			{items.find((f) => f.value === value)?.name ?? placeholder}
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#if hasNone}
					<Select.Item value="none">None</Select.Item>
				{/if}
				{#each items as option}
					<Select.Item value={option.value}>
						{option.name}
					</Select.Item>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</div>
