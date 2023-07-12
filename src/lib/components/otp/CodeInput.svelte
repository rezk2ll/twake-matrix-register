<script lang="ts">
	import OtpField from '../input/OtpField.svelte';

	export let mask: string;

	let input1: HTMLInputElement;
	let input2: HTMLInputElement;
	let input3: HTMLInputElement;
	let input4: HTMLInputElement;
	let form: HTMLFormElement;

	let value1: string | undefined = undefined;
	let value2: string | undefined = undefined;
	let value3: string | undefined = undefined;
	let value4: string | undefined = undefined;

	$: value = `${value1}${value2}${value3}${value4}`;

	const handleSubmit = () => {
		if (!value || value.length !== 4) {
			return;
		}

		form.submit();
	};
</script>

<div class="flex flex-col space-y-4 items-center justify-center">
	<h1 class="text-md font-bold text-center mb-4 cursor-pointer text-white w-full">
		Enter the verification code sent to {mask}
	</h1>
	<form
		action="/register?/check"
		method="POST"
		class="flex flex-row space-x-8 w-full items-center justify-center"
		bind:this={form}
	>
		<OtpField bind:value={value1} bind:input={input1} onChange={() => input2.focus()} />
		<OtpField bind:value={value2} bind:input={input2} onChange={() => input3.focus()} />
		<OtpField bind:value={value3} bind:input={input3} onChange={() => input4.focus()} />
		<OtpField bind:value={value4} bind:input={input4} onChange={handleSubmit} />
		<input required type="hidden" name="password" bind:value />
	</form>
</div>
