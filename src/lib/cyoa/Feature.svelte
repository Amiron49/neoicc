<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import Points from './features/Points.svelte';
	import Symbols from './features/Symbols.svelte';
	import Variables from './features/Variables.svelte';
	import Groups from './features/Groups.svelte';
	import Templates from './features/Templates.svelte';
	import Backpack from './Backpack.svelte';
	import Defaults from './features/Defaults.svelte';
	import Words from './features/Words.svelte';
	import IdSearch from './features/IDSearch.svelte';

	const { open, onclose }: { open: boolean; onclose: () => void } = $props();

	let modal = $state<
		| 'none'
		| 'appPoints'
		| 'appVariables'
		| 'appGroups'
		| 'appBackpack'
		| 'appTemplates'
		| 'appDefaults'
		| 'appSymbols'
		| 'appWords'
		| 'appIdSearch'
	>('none');
</script>

<Dialog.Root bind:open={() => open, (a) => !a && onclose()}>
	<Dialog.Content class="sm:max-w-[1200px]">
		<Dialog.Header>
			<Dialog.Title>Features</Dialog.Title>
		</Dialog.Header>
		<div class="grid grid-cols-2 gap-4 py-4 text-sm">
			<div>
				<p>
					Point systems can be created and used to handle the player's ability to buy things and to
					keep a record of selected choices in a group or row.
				</p>
				<Button class="w-full" onclick={() => (modal = 'appPoints')}>Manage Points</Button>
			</div>

			<div>
				<p>
					Variables can currently only be used by adding them to buttons, which in turn can activate
					and deactivate them, and the variable-id can be used in requirements.
				</p>
				<Button class="w-full" onclick={() => (modal = 'appVariables')}>Manage Variables</Button>
			</div>

			<div>
				<p>
					Rows and objects can be added into groups, and rows that show the selected choices can
					then use a group to decide which choices to show.
				</p>
				<Button class="w-full" onclick={() => (modal = 'appGroups')}>Manage Groups</Button>
			</div>

			<div>
				<p>
					The backpack is where rows can show which choices have been selected can be placed, and
					the import is where selected choices can be imported.
				</p>
				<Button class="w-full" onclick={() => (modal = 'appBackpack')}>
					Manage Backpack and choice import
				</Button>
			</div>

			<div>
				<p>
					In defaults, you can write in default text that you want the choices and rows to be filled
					with when created.
				</p>
				<Button class="w-full" onclick={() => (modal = 'appDefaults')}>Manage Defaults</Button>
			</div>

			<div>
				<p>
					In styles, you can find the premade design-templates, that either can be used as-is or to
					create a new design from.
				</p>
				<Button class="w-full" onclick={() => (modal = 'appTemplates')}>Style Templates</Button>
			</div>

			<div>
				<p>
					Words can be changed when a choice is presssed, or in textfields by the player, and be
					placed around in the text.
				</p>
				<Button class="w-full" onclick={() => (modal = 'appWords')}>Manage Words</Button>
			</div>

			<div>
				<p>
					Symbols will show off some of the alt-codes that can be used in your project where you can
					place text. This is also where you can compress all the images in your project.
				</p>
				<Button class="w-full" onclick={() => (modal = 'appSymbols')}>
					Symbols and Image Compression
				</Button>
			</div>

			<div class="col-span-2">
				<p>Will show you a list of ID's and the names of the choices they belong to.</p>
				<Button class="w-full" onclick={() => (modal = 'appIdSearch')}>Id / Name list</Button>
			</div>
		</div>
		<Dialog.Footer>
			<Button onclick={() => onclose()}>Close</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

<Points open={modal === 'appPoints'} onclose={() => (modal = 'none')} />
<Variables open={modal === 'appVariables'} onclose={() => (modal = 'none')} />
<Groups open={modal === 'appGroups'} onclose={() => (modal = 'none')} />
<Backpack open={modal === 'appBackpack'} onclose={() => (modal = 'none')} />
<Templates open={modal === 'appTemplates'} onclose={() => (modal = 'none')} />
<Defaults open={modal === 'appDefaults'} onclose={() => (modal = 'none')} />
<Words open={modal === 'appWords'} onclose={() => (modal = 'none')} />
<Symbols open={modal === 'appSymbols'} onclose={() => (modal = 'none')} />
<IdSearch open={modal === 'appIdSearch'} onclose={() => (modal = 'none')} />
