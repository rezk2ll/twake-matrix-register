<script lang="ts">
	import UsedPhone from './../otp/UsedPhone.svelte';
	import InfoTooltip from './../dispaly/InfoTooltip.svelte';
	import TextField from '../input/TextField.svelte';
	import PasswordField from '../input/PasswordField.svelte';
	import PhoneField from '../input/PhoneField.svelte';
	import SubmitButton from '../button/SubmitButton.svelte';
	import VerifyPhoneModal from '../otp/VerifyPhoneModal.svelte';
	import { form, phone as phoneStore, verified } from '../../../store';
	import { enhance } from '$app/forms';
	import AvailableNicknames from '../user/AvailableNicknames.svelte';
	import { createUserFormSchema, fullCreateUserFormSchema } from '$lib/schemas/zodSchema';
	import { isNickNameTaken, isPhoneTaken, suggestNickNames } from '$lib/utils/api';

	let password = '';
	let confirmPassword = '';
	let firstName = '';
	let lastName = '';
	let nickName = '';
	let phone = '';
	let accepted = false;
	let disabled = true;
	let alternativeNicknames: string[] = [];
	let loading = false;
	let nickNameTaken = false;
	let nickNamechecked = false;
	let phoneTaken = false;
	let loadingPhone = false;
	let phoneChecked = false;

	$: !!phone && phoneStore.set(phone);
	$: invalidPhone = !createUserFormSchema.safeParse({ phone }).success || phoneTaken;

	$: {
		if ($form?.nickname_taken === true) nickNameTaken = true;
	}

	$: disabled =
		!fullCreateUserFormSchema.safeParse({
			firstName,
			lastName,
			nickName,
			phone,
			password,
			confirmPassword,
			accepted
		}).success ||
		nickNameTaken ||
		phoneTaken ||
		!$verified;

	$: validNickName = nickName.length > 0 && nickNamechecked && !nickNameTaken;

	const checkNickName = async () => {
		if (!nickName || nickNamechecked) return;

		loading = true;
		alternativeNicknames = [];
		nickNameTaken = false;
		nickNamechecked = true;
		await new Promise((resolve) => setTimeout(resolve, 100));

		const result = await isNickNameTaken(nickName);

		if (result && firstName && lastName) {
			alternativeNicknames = await suggestNickNames(firstName, lastName);
			nickNamechecked = false;
		}

		loading = false;
		nickNameTaken = result;
	};

	const checkPhone = async () => {
		if (!createUserFormSchema.safeParse({ phone }).success || phoneChecked) return;

		loadingPhone = true;
		phoneChecked = true;
		phoneTaken = await isPhoneTaken(phone);

		loadingPhone = false;
	};

	const invalidateNickNameCheck = () => {
		nickNamechecked = false;
		nickNameTaken = false;
	};
	const invalidatePhoneCheck = () => {
		phoneChecked = false;
		phoneTaken = false;
	};
</script>

<form
	use:enhance
	action="?/register"
	method="POST"
	class="flex flex-col space-y-4 px-4 py-3 xl:px-3 lg:space-y-5 font-[Inter] w-full"
>
	<div class="flex flex-col lg:flex-row lg:space-x-5 space-y-4 lg:space-y-0 w-full">
		<TextField
			name="firstname"
			placeholder="First Name"
			label="First Name"
			bind:value={firstName}
			isInValid={false}
			feedback={false}
		/>
		<TextField
			name="lastname"
			placeholder="Last Name"
			label="Last Name"
			bind:value={lastName}
			isInValid={false}
			feedback={false}
		/>
	</div>
	<div class="w-full">
		<TextField
			name="nickname"
			placeholder="Last Name"
			label="Username"
			bind:value={nickName}
			isInValid={!createUserFormSchema.safeParse({ nickName }).success || nickNameTaken}
			onBlur={checkNickName}
			feedback={validNickName}
			onInput={invalidateNickNameCheck}
			{loading}
			suffix="@twake.app"
			info={true}
			infoTitle="Matrix ID/Email"
			infoDescription="Username you enter will be used to form you Matrix ID as well as your Twake mail address."
		/>
		{#if nickNameTaken === true}
			<AvailableNicknames
				bind:value={nickName}
				nickNames={alternativeNicknames}
				bind:show={nickNameTaken}
				bind:checked={nickNamechecked}
			/>
		{:else if nickName.length && !createUserFormSchema.safeParse({ nickName }).success}
			<span class="text-xs font-medium leading-4 tracking-wide text-left text-red-500 px-5"
				>invalid Username.
			</span>
		{/if}
	</div>

	<PasswordField
		name="password"
		placeholder="Password"
		label="Password"
		bind:value={password}
		isInvalid={!createUserFormSchema.safeParse({ password }).success}
	/>
	{#if $form?.invalid_password}
		<span class="text-xs font-medium leading-4 tracking-wide text-left text-red-500 px-5"
			>invalid password
		</span>
	{/if}

	<PasswordField
		name="confirmpassword"
		placeholder="Confirm password"
		label="Confirm password"
		bind:value={confirmPassword}
		isInvalid={!fullCreateUserFormSchema.safeParse({ password, confirmPassword }).success}
	/>
	<div class="max-w-full">
		<PhoneField
			bind:value={phone}
			isInValid={invalidPhone}
			onBlur={checkPhone}
			onInput={invalidatePhoneCheck}
			loading={loadingPhone}
			checked={phoneChecked}
		>
			<VerifyPhoneModal bind:phone />
		</PhoneField>
		{#if $form?.invalid_phone}
			<span class="text-xs font-medium leading-4 tracking-wide text-left text-red-500 px-5"
				>invalid phone number
			</span>
		{:else if phoneTaken}
			<div class="relative w-full">
				<UsedPhone />
			</div>
		{/if}
	</div>
	<div class="flex flex-col items-center justify-center pt-8">
		<SubmitButton {disabled}>Sign up</SubmitButton>
	</div>
	<div class="flex items-start space-x-5 xl:-mx-5">
		<input type="checkbox" bind:checked={accepted} class="mt-1" />
		<span class="text-[17px] font-medium leading-6 tracking-tight text-left"
			>I agree with <a href="#/ue" class="text-blue-500">User Agreement</a> and
			<a href="#/ue" class="text-blue-500">Personal Data Usage</a>
			terms under conditions stipulated in
			<a href="#/pp" class="text-blue-500">Privacy Policy</a> agreement.</span
		>
	</div>
</form>
