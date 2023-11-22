<script lang="ts">
	import type { PasswordType } from '../../../types';
	import Hide from '../icons/hide.svelte';
	import Show from '../icons/show.svelte';
	import Valid from '../icons/valid.svelte';

	export let value: string;
	export let isInvalid: boolean;
	export let label: string;
	export let name: string;
	export let placeholder: string;
	export let feedback: boolean = true;

	let type: PasswordType = 'password';

	const handleChange = (e: Event) => {
		value = (e.target as HTMLInputElement).value;
	};

	const toggleVisibility = () => {
		type = type === 'text' ? 'password' : 'text';
	};

	$: notValid = value.length > 0 && isInvalid;
</script>

<div class="relative mt-6">
	<input
		id={name}
		{placeholder}
		{value}
		{type}
		{name}
		on:input={handleChange}
		class="h-[52px] rounded-[4px] ring-2 focus:outline-none px-5 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent {notValid
			? 'ring-red-500 focus:ring-red-500'
			: 'ring-gray-300 focus:ring-blue-500'}"
		required
	/>
	<label
		for={name}
		class="absolute left-0 bg-white px-1 duration-100 ease-linear ml-1 -translate-y-2.5 translate-x-2 text-xs font-medium leading-4 {notValid
			? 'text-red-500'
			: ''}"
		>{label}</label
	>
	{#if value}
		<span
			class="absolute inset-y-0 {notValid
				? 'right-0'
				: feedback
				? 'right-10'
				: 'right-0'} flex items-center pl-2"
		>
			<button
				type="button"
				class="p-1 focus:outline-none focus:shadow-outline"
				on:click={toggleVisibility}
			>
				{#if type === 'text'}
					<Hide />
				{:else}
					<Show />
				{/if}
			</button>
		</span>
		{#if notValid === false && feedback}
			<span class="absolute inset-y-0 right-0 flex items-center pl-2">
				<div class="p-1 focus:outline-none focus:shadow-outline">
					<Valid />
				</div>
			</span>
		{/if}
	{/if}
</div>
