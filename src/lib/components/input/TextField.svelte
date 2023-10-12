<script lang="ts">
	import Valid from '../icons/valid.svelte';

	export let label: string;
	export let placeholder: string;
	export let value: string;
	export let isInValid: boolean;
	export let name: string;
	export let feedback: boolean = true;
</script>

<div class="relative mt-6">
	<input
		required
		id={name}
		{name}
		bind:value
		{placeholder}
		type="text"
		class="h-14 rounded-[4px] ring-2 focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-[-0.15000000596046448px] text-left peer w-full placeholder:text-transparent {isInValid
			? 'ring-red-500 focus:ring-red-500'
			: 'ring-gray-300 focus:ring-blue-500'}"
	/>
	<label
		for="field"
		class="absolute left-0 bg-white px-1 duration-100 ease-linear ml-1 -translate-y-2.5 translate-x-2 text-xs font-medium leading-4 {isInValid
			? 'text-red-500'
			: ''}">{label}</label
	>
	{#if feedback && value && isInValid === false}
		<span class="absolute inset-y-0 right-0 flex items-center pl-2">
			<div class="p-1 focus:outline-none focus:shadow-outline">
				<Valid />
			</div>
		</span>
	{/if}
</div>
