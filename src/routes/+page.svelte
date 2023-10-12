<script lang="ts">
	import { form as formStore } from './../store';
	import AccessSelect from '$lib/components/landing/AccessSelect.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: formStore.set(form);
</script>

<div class="flex space-x-4 w-full min-h-screen md:px-10 2xl:px-52 py-5 pt-10">
	<div class="w-full overflow-hidden">
		<div class="flex flex-col md:flex-row w-full">
			<Hero />
			<AccessSelect />
		</div>
	</div>
</div>
