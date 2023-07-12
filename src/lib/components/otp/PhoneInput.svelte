<script lang="ts">
	import { TelInput, normalizedCountries } from 'svelte-tel-input';
	import type { CountryCode, DetailedValue, E164Number } from 'svelte-tel-input/types';

	let selectedCountry: CountryCode | null = 'FR';
	let valid = false;
	let value: E164Number | null = null;
	let detailedValue: DetailedValue;
	const options = { spaces: false };
</script>

<div class="flex flex-col space-y-4">
	<h1 class="text-xl font-semibold capitalize text-gray-800 dark:text-white lg:text-2xl">
		Enter your phone number
	</h1>
	<form
		class="flex flex-col items-center justify-center space-y-4"
		action="/register?/otp"
		method="POST"
	>
		<div class="w-full flex">
			<!-- <select
				class="form-select appearance-none block px-3 py-1.5 text-base font-normal bg-clip-padding bg-no-repeat cursor-pointer text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
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
			</select> -->
			<TelInput
				bind:country={selectedCountry}
				bind:valid
				bind:detailedValue
				bind:value
				{options}
				required={true}
				class="text-sm rounded-r-lg block w-full p-2.5 focus:outline-none border border-gray-300 border-l-gray-100 dark:border-l-gray-700 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white text-gray-900"
			/>
		</div>
		<input type="hidden" bind:value name="phone" />
		<input
			type="submit"
			value="send verification message"
			class="flex items-center cursor-pointer font-medium text-sm justify-center m-1 p-3 w-full transform rounded-md bg-blue-500 capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
		/>
	</form>
</div>
