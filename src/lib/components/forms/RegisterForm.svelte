<script lang="ts">
	import { validatePassword } from '$lib/utils/password';
	import { validateName, validateNickName } from '$lib/utils/username';
	import { isPhoneValid } from '$lib/utils/phone';
	import TextField from '../input/TextField.svelte';
	import PasswordField from '../input/PasswordField.svelte';
	import PhoneField from '../input/PhoneField.svelte';
	import SubmitButton from '../button/SubmitButton.svelte';
	import OutlineLink from '../link/OutlineLink.svelte';
	import VerifyPhoneModal from '../otp/VerifyPhoneModal.svelte';
	import { form, phone as phoneStore } from '../../../store';
	import { enhance } from '$app/forms';
	import AvailableNicknames from '../user/AvailableNicknames.svelte';

	let password = '';
	let confirmPassword = '';
	let firstName = '';
	let lastName = '';
	let nickName = '';
	let phone = '';
	let invalidPhone = false;
	let show_suggestions = true;

	$: invalidPassword = password.length > 0 && !validatePassword(password);
	$: invalidConfirmPassword =
		confirmPassword.length > 0 &&
		(confirmPassword !== password || !validatePassword(confirmPassword));
	$: invalidFirstName = firstName.length > 0 && !validateName(firstName);
	$: invalidLastName = lastName.length > 0 && !validateName(lastName);
	$: invalidNickname =
		nickName.length > 0 && !validateNickName(nickName);
	$: {
		invalidPhone = !!phone && phone.length > 0 && !isPhoneValid(phone);
		!!phone && phoneStore.set(phone);
	}

	$: {
		if ($form?.nickname_taken === true) show_suggestions = true; 
	}
</script>

<form use:enhance action="?/register" method="POST" class="flex flex-col space-y-6">
	<div class="flex space-x-5 text-xs font-medium leading-4 tracking-wide text-left font-[Inter]">
		<TextField
			name="firstname"
			placeholder="First Name"
			label="First Name"
			bind:value={firstName}
			bind:isInValid={invalidFirstName}
		/>
		<TextField
			name="lastname"
			placeholder="Last Name"
			label="Last Name"
			bind:value={lastName}
			bind:isInValid={invalidLastName}
		/>
	</div>
	<div>
		<TextField
			name="nickname"
			placeholder="Last Name"
			label="Username"
			bind:value={nickName}
			bind:isInValid={invalidNickname}
		/>
		{#if $form?.invalid_nickname}
			<span
				class="text-xs font-medium leading-4 tracking-[0.4000000059604645px] text-left text-red-500 px-5"
				>invalid Username.
			</span>
		{/if}

		{#if $form?.nickname_taken}
			<AvailableNicknames
				bind:value={nickName}
				nickNames={$form?.alternative_nicknames}
				bind:show={show_suggestions}
			/>
		{/if}
	</div>
	<div>
		<PasswordField
			name="password"
			placeholder="Password"
			label="Password"
			bind:value={password}
			bind:isInvalid={invalidPassword}
		/>

		{#if $form?.invalid_password}
			<span
				class="text-xs font-medium leading-4 tracking-[0.4000000059604645px] text-left text-red-500 px-5"
				>invalid password
			</span>
		{/if}
	</div>
	<PasswordField
		name="confirmpassword"
		placeholder="Confirm password"
		label="Confirm password"
		bind:value={confirmPassword}
		bind:isInvalid={invalidConfirmPassword}
	/>
	<div>
		<PhoneField bind:value={phone} bind:isInValid={invalidPhone}>
			<VerifyPhoneModal bind:phone />
		</PhoneField>
		{#if $form?.invalid_phone}
			<span
				class="text-xs font-medium leading-4 tracking-[0.4000000059604645px] text-left text-red-500 px-5"
				>invalid phone number
			</span>
		{/if}
	</div>

	<div class="flex flex-col items-center justify-center space-y-5">
		<SubmitButton>Sign up</SubmitButton>
		<OutlineLink href="#/login">Login with SSO</OutlineLink>
	</div>
	<div class="flex items-start space-x-5 pr-10">
		<input type="checkbox" required class=" mt-1" />
		<span class="text-[17px] font-medium leading-6 tracking-[-0.15000000596046448px] text-left"
			>I agree with <a href="#/ue" class="text-blue-500">User Agreement</a> and
			<a href="#/ue" class="text-blue-500">Personal Data Usage</a>
			terms under conditions stipulated in
			<a href="#/pp" class="text-blue-500">Privacy Policy</a> agreement.</span
		>
	</div>
</form>
