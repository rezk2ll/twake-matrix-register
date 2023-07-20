<script lang="ts">
	import { enhance } from '$app/forms';
	import Fail from '../dispaly/Fail.svelte';
	import Spinner from '../dispaly/Spinner.svelte';
	import Success from '../dispaly/Success.svelte';
	import OtpField from '../input/OtpField.svelte';

	export let mask: string;
	export let valid: boolean = true;

	let input1: HTMLInputElement;
	let input2: HTMLInputElement;
	let input3: HTMLInputElement;
	let input4: HTMLInputElement;
	let form: HTMLFormElement;

	let value1: string | undefined = undefined;
	let value2: string | undefined = undefined;
	let value3: string | undefined = undefined;
	let value4: string | undefined = undefined;
	let loading: boolean = false;

	$: value = `${value1}${value2}${value3}${value4}`;

	const handleSubmit = () => {
		if (!value || value.length !== 4) {
			return;
		}

		loading = true;

		form.submit();
	};
</script>

<div class="flex flex-col space-y-4 items-center justify-center">
	<h3 class="text-lg font-semibold leading-tight uppercase">OTP Verification</h3>
	{#if valid}
		<Success>
			we've sent the verification code to {mask}
		</Success>
	{:else}
		<Fail>Invalid verification code, try again</Fail>
	{/if}
	<form
		action="/register/otp"
		method="POST"
		class="flex flex-row space-x-8 w-full items-center justify-center"
		bind:this={form}
		use:enhance
	>
		<OtpField bind:value={value1} bind:input={input1} onChange={() => input2.focus()} />
		<OtpField bind:value={value2} bind:input={input2} onChange={() => input3.focus()} />
		<OtpField bind:value={value3} bind:input={input3} onChange={() => input4.focus()} />
		<OtpField bind:value={value4} bind:input={input4} onChange={handleSubmit} />
		<button
			on:click={handleSubmit}
			type="submit"
			disabled={loading}
			class="flex items-center cursor-pointer font-bold justify-center m-1 p-3 w-full transform rounded-lg bg-blue-500 disabled:bg-blue-400 capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
		>
			{#if loading}
				<Spinner />
			{:else}
				Verify
			{/if}
		</button>
		<input required type="hidden" name="password" bind:value />
	</form>
</div>
