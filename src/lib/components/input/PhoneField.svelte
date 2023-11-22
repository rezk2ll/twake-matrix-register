<script lang="ts">
	import Valid from '../icons/valid.svelte';
	import { verified } from '../../../store';

	export let value: string;
	export let isInValid: boolean;

	$: notValid = value.length > 0 && isInValid;
</script>

<div class="relative mt-6">
	<input
		required
		id="phone"
		name="phone"
		type="text"
		bind:value
		class="h-14 rounded-[4px] ring-2 focus:outline-none px-5 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent {notValid
			? 'ring-red-500 focus:ring-red-500'
			: 'ring-gray-300 focus:ring-blue-500'}"
		placeholder="phone number"
	/>
	<label
		for="phone"
		class="absolute left-0 bg-white px-1 duration-100 ease-linear ml-1 -translate-y-2.5 translate-x-2 text-xs font-medium leading-4 {notValid
			? 'text-red-500'
			: ''}">Phone number</label
	>
	{#if $verified === false && value && notValid === false}
		<span class="absolute inset-y-0 right-0 flex items-center pl-2">
			<slot />
		</span>
	{/if}
	{#if $verified === true}
		<span class="absolute inset-y-0 right-0 flex items-center pl-2">
			<Valid />
		</span>
	{/if}
</div>
