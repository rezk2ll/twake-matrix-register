<script lang="ts">
	import Valid from '../icons/valid.svelte';
	import { verified } from '../../../store';
	import Spin from '../icons/Spin.svelte';
	import FieldError from '../dispaly/FieldError.svelte';
	import { isMobile } from '$lib/utils/device';

	export let value: string;
	export let isInValid: boolean;
	export let onBlur: () => void = () => {};
	export let onInput: () => void = () => {};
	export let loading: boolean = false;
	export let checked: boolean;
	export let error: string = '';

	$: notValid = value.length > 0 && isInValid;
	$: displaySlot = $verified === false && notValid === false && checked;
</script>

<div class="flex flex-col space-y-1">
	<div class="relative">
		<input
			required
			id="phone"
			name="phone"
			type="text"
			on:blur={onBlur}
			on:input={onInput}
			bind:value
			class="h-[52px] rounded-[4px] ring-2 focus:outline-none px-5 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent {notValid
				? 'ring-red-500 focus:ring-red-500'
				: 'ring-gray-300 focus:ring-blue-500'}"
			placeholder="phone number"
		/>
		<label
			for="phone"
			class="absolute left-0 bg-white px-1 duration-100 ease-linear ml-1 -translate-y-2.5 translate-x-2 overflow-hidden text-ellipsis text-[11px] not-italic font-medium leading-4 tracking-[0.5px] {notValid
				? 'text-red-500'
				: 'text-[#1C1B1F]'}">Phone number</label
		>
		<span class="absolute inset-y-0 right-0 flex items-center px-1">
			{#if loading}
				<Spin />
			{:else if displaySlot}
				<div class="hidden lg:block">
					<slot />
				</div>
			{:else if $verified}
				<Valid />
			{/if}
		</span>
	</div>
	{#if error.length && notValid}
		<FieldError {error} />
	{/if}
	{#if displaySlot && isMobile()}
		<div class="lg:hidden">
			<slot />
		</div>
	{/if}
</div>
