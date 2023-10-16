<script lang="ts">
	import OutlineButton from './../button/OutlineButton.svelte';
	import SubmitButton from '../button/SubmitButton.svelte';
	import TextField from '../input/TextField.svelte';
	import { maskPhone } from '$lib/utils/phone';
	import { enhance } from '$app/forms';
	import { form, verified } from '../../../store';
	import { validateOTP } from '$lib/utils/password';

	export let phone: string;

	let value: string = '';
	let open = false;
	let sendOtpForm: HTMLFormElement;

	const handleSendOtp = () => {
		if (!phone) return;

		sendOtpForm.requestSubmit();
	};

	const openVerificationModal = async () => {
		open = true;
		handleSendOtp();
	};

	$: incorrect = $form?.incorrect === true;
	$: inValid = !validateOTP(value);
	$: {
		if ($form?.verified) {
			if (open === true) {
				verified.set(true);
				$form.verified = false;
			}

			open = false;
		}
	}
</script>

<span class="absolute inset-y-0 right-0 flex items-center px-2">
	<button
		type="button"
		class="p-1 focus:outline-none focus:shadow-outline px-5 rounded-3xl bg-indigo-50 text-sm text-blue-500 font-medium leading-5 h-11 items-center"
		on:click={openVerificationModal}
	>
		Verify
	</button>
</span>
<div
	class="fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center {open ===
	false
		? 'hidden'
		: ''}"
	style="background: rgba(0,0,0,.6);"
>
	<div class=" bg-white w-full md:max-w-md mx-auto rounded-2xl shadow-xl z-50 overflow-y-auto">
		<div class="text-left">
			<div class="flex justify-between items-center">
				<div />
				<button
					class="modal-close cursor-pointer z-50"
					type="button"
					on:click={() => (open = false)}
				>
					<svg
						width="56"
						height="56"
						viewBox="0 0 56 56"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clip-path="url(#clip0_14295_114002)">
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M28 16.125C21.4331 16.125 16.125 21.4331 16.125 28C16.125 34.5669 21.4331 39.875 28 39.875C34.5669 39.875 39.875 34.5669 39.875 28C39.875 21.4331 34.5669 16.125 28 16.125ZM28 37.5C22.7631 37.5 18.5 33.2369 18.5 28C18.5 22.7631 22.7631 18.5 28 18.5C33.2369 18.5 37.5 22.7631 37.5 28C37.5 33.2369 33.2369 37.5 28 37.5ZM28 26.3256L32.2631 22.0625L33.9375 23.7369L29.6744 28L33.9375 32.2631L32.2631 33.9375L28 29.6744L23.7369 33.9375L22.0625 32.2631L26.3256 28L22.0625 23.7369L23.7369 22.0625L28 26.3256Z"
								fill="#1C1B1F"
							/>
						</g>
						<defs>
							<clipPath id="clip0_14295_114002">
								<rect x="4.25" y="4.25" width="47.5" height="47.5" rx="23.75" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</button>
			</div>
			<form use:enhance action="?/sendOtp" method="POST" class="hidden" bind:this={sendOtpForm}>
				<input type="text" name="phone" bind:value={phone} required />
			</form>
			<div class="flex flex-col space-y-2">
				<h1 class="text-2xl font-semibold leading-8 tracking-normal text-center">
					Phone number confirmation
				</h1>
				<span class="text-base font-medium leading-6 tracking-tight text-center text-gray-400"
					>Enter 6 digit code we sent to:</span
				>
				<span class="text-base font-medium leading-6 tracking-tight text-center"
					>{maskPhone(phone)}</span
				>
			</div>
			<form action="?/checkOtp" use:enhance method="POST" class="px-10 pb-10">
				<div class="my-5">
					<TextField
						label="Code"
						placeholder="Code"
						bind:value
						name="password"
						isInValid={incorrect}
						feedback={false}
					/>
					{#if incorrect}
						<span class="text-xs font-medium leading-4 tracking-tight text-left text-red-500 px-5"
							>Entered code is incorrect. Try again.
						</span>
					{/if}
				</div>
				<div class="flex flex-col space-y-2 pt-2">
					<SubmitButton disabled={inValid}>Confirm</SubmitButton>
					<OutlineButton handler={handleSendOtp}>Send code</OutlineButton>
				</div>
			</form>
		</div>
	</div>
</div>