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

	let password: string = '';
	let confirmPassword: string = '';
	let firstName: string = '';
	let lastName: string = '';
	let nickName: string = '';
	let phone: string = '';

	$: invalidPassword = password.length > 0 && !validatePassword(password);
	$: invalidConfirmPassword =
		confirmPassword.length > 0 &&
		(confirmPassword !== password || !validatePassword(confirmPassword));
	$: invalidFirstName = firstName.length > 0 && !validateName(firstName);
	$: invalidLastName = lastName.length > 0 && !validateName(lastName);
	$: invalidNickname = nickName.length > 0 && !validateNickName(nickName);
	$: invalidPhone = phone.length > 0 && !isPhoneValid(phone);
</script>

<form action="" class="flex flex-col space-y-6">
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
	<TextField
		name="nickname"
		placeholder="Last Name"
		label="Username"
		bind:value={nickName}
		bind:isInValid={invalidNickname}
	/>
	<PasswordField
		name="password"
		placeholder="Password"
		label="Password"
		bind:value={password}
		bind:isInvalid={invalidPassword}
	/>
	<PasswordField
		name="confirmpassword"
		placeholder="Confirm password"
		label="Confirm password"
		bind:value={confirmPassword}
		bind:isInvalid={invalidConfirmPassword}
	/>

	<PhoneField bind:value={phone} bind:isInValid={invalidPhone}>
		<VerifyPhoneModal bind:phone />
	</PhoneField>

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
