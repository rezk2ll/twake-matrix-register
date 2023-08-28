<script lang="ts">
	import { TelInput, normalizedCountries } from 'svelte-tel-input';
	import type { CountryCode, DetailedValue, E164Number } from 'svelte-tel-input/types';
	import Info from '../dispaly/Info.svelte';
	import { enhance } from '$app/forms';
	import Spinner from '../dispaly/Spinner.svelte';
	import Fail from '../dispaly/Fail.svelte';

	export let invalid = false;

	let selectedCountry: CountryCode | null = 'FR';
	let valid = false;
	let value: E164Number | null = null;
	let detailedValue: DetailedValue;
	const options = { spaces: false };
	let loading = false;
</script>

<div class="flex flex-col space-y-8">
	<div class="flex items-center justify-center">
		<h1 class="text-black text-4xl not-italic font-bold">Sign up</h1>
	</div>
	{#if invalid}
		<Fail>This phone number is not available</Fail>
	{:else}
		<Info
			text="Enter the phone number that you will be using to create your account, we will send a verification code to this number."
		/>
	{/if}
	<form
		class="flex flex-col items-center justify-center space-y-4"
		action="/register"
		method="POST"
		use:enhance
	>
		<div class="w-full flex">
			<select
				class="form-select appearance-none block px-3 py-1.5 text-base font-normal bg-clip-padding bg-no-repeat cursor-pointer text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg focus:outline-none"
				aria-label="select country"
				name="Country"
				bind:value={selectedCountry}
			>
				<option value={null} hidden={selectedCountry !== null}>Please select</option>
				{#each normalizedCountries || [] as country (country.id)}
					<option
						value={country.iso2}
						selected={country.iso2 === selectedCountry}
						aria-selected={country.iso2 === selectedCountry}
					>
						{country.iso2} (+{country.dialCode})
					</option>
				{/each}
			</select>
			<TelInput
				bind:country={selectedCountry}
				bind:valid
				bind:detailedValue
				bind:value
				{options}
				required={true}
				class="text-sm rounded-r-lg block w-full p-2.5 focus:border-blue-600 border border-gray-300 border-l-gray-100 bg-gray-100  text-gray-900"
			/>
		</div>
		<input type="hidden" bind:value name="phone" />
		<button
			disabled={loading}
			type="submit"
			class="flex items-center cursor-pointer font-medium text-sm justify-center m-1 p-3 w-full transform rounded-md bg-blue-500 tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
		>
			{#if loading}
				<Spinner />
			{:else}
				Send verification message
			{/if}
		</button>
	</form>
</div>
