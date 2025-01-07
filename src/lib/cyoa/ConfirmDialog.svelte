<script lang="ts">
	import * as AlertDialog from '$lib/components/ui/alert-dialog';

	const {
		open,
		onclose,
		onconfirm,
		text
	}: { open: boolean; onclose: () => void; onconfirm: () => void; text: string } = $props();
</script>

<AlertDialog.Root {open} onOpenChange={() => onclose()}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you sure?</AlertDialog.Title>
			<AlertDialog.Description>{text}</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
			<AlertDialog.Action onclick={() => onconfirm()}>Continue</AlertDialog.Action>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>
