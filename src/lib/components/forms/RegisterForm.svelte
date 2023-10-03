<script lang="ts">
	import Valid from './../icons/valid.svelte';
	import { validatePassword } from '$lib/utils/password';
	import type { PasswordType } from '../../../types';
	import See from '../icons/see.svelte';
	import { validateName, validateNickName } from '$lib/utils/username';
	import { isPhoneValid } from '$lib/utils/phone';

	let passwordType: PasswordType = 'password';
	let confirmPasswordType: PasswordType = 'password';

	const togglePassword = () => {
		passwordType = passwordType === 'text' ? 'password' : 'text';
	};

	const toggleConfirmPassword = () => {
		confirmPasswordType = confirmPasswordType === 'text' ? 'password' : 'text';
	};

	const handlePasswordChange = (e: Event) => {
		password = (e.target as HTMLInputElement).value;
	};
	const handleConfirmPasswordChange = (e: Event) => {
		confirmPassword = (e.target as HTMLInputElement).value;
	};

	let password: string = '';
	let confirmPassword: string = '';
	let firstName: string = '';
	let lastName: string = '';
	let nickName: string = '';
	let phone: string = '';

	$: invalidPassword = password && !validatePassword(password);
	$: invalidConfirmPassword = confirmPassword && confirmPassword !== password;
	$: invalidFirstName = firstName.length && !validateName(firstName);
	$: invalidLastName = lastName.length && !validateName(lastName);
	$: invalidNickname = nickName.length && !validateNickName(nickName);
	$: invalidPhone = phone.length && !isPhoneValid(phone);
</script>

<form action="" class="flex flex-col space-y-6 px-10">
	<div class="flex space-x-5 text-xs font-medium leading-4 tracking-wide text-left font-[Inter]">
		<div class="relative mt-6">
			<input
				required
				id="firstname"
				bind:value={firstName}
				type="text"
				class="peer w-full placeholder:text-transparent {invalidFirstName
					? 'ring-red-500 focus:ring-red-500'
					: 'ring-gray-300 focus:ring-blue-500'}"
				placeholder="Fist name"
			/>
			<label for="firstname">First Name</label>
			{#if invalidFirstName === false}
				<span class="absolute inset-y-0 right-0 flex items-center pl-2">
					<div class="p-1 focus:outline-none focus:shadow-outline">
						<Valid />
					</div>
				</span>
			{/if}
		</div>
		<div class="relative mt-6">
			<input
				required
				id="lastname"
				bind:value={lastName}
				type="text"
				class="peer w-full placeholder:text-transparent {invalidLastName
					? 'ring-red-500 focus:ring-red-500'
					: 'ring-gray-300 focus:ring-blue-500'}"
				placeholder="Last name"
			/>
			<label for="lastname">Last Name</label>
			{#if invalidLastName === false}
				<span class="absolute inset-y-0 right-0 flex items-center pl-2">
					<div class="p-1 focus:outline-none focus:shadow-outline">
						<Valid />
					</div>
				</span>
			{/if}
		</div>
	</div>
	<div class="relative mt-6">
		<input
			required
			id="username"
			bind:value={nickName}
			type="text"
			class="peer w-full placeholder:text-transparent {invalidNickname
				? 'ring-red-500 focus:ring-red-500'
				: 'ring-gray-300 focus:ring-blue-500'}"
			placeholder="Username"
		/>
		<label for="username">Username</label>
		{#if invalidNickname === false}
			<span class="absolute inset-y-0 right-0 flex items-center pl-2">
				<div class="p-1 focus:outline-none focus:shadow-outline">
					<Valid />
				</div>
			</span>
		{/if}
	</div>
	<div class="relative mt-6">
		<input
			required
			id="password"
			on:input={handlePasswordChange}
			class="peer w-full placeholder:text-transparent {invalidPassword
				? 'ring-red-500 focus:ring-red-500'
				: 'ring-gray-300 focus:ring-blue-500'}"
			placeholder="Password"
			value={password}
			type={passwordType}
		/>
		<label for="Password">Password</label>
		{#if password}
			<span class="absolute inset-y-0 right-0 flex items-center pl-2">
				<button class="p-1 focus:outline-none focus:shadow-outline" on:click={togglePassword}>
					<See />
				</button>
			</span>
		{/if}
	</div>
	<div class="relative mt-6">
		<input
			required
			id="confirm"
			on:input={handleConfirmPasswordChange}
			class="peer w-full placeholder:text-transparent {invalidConfirmPassword
				? 'ring-red-500 focus:ring-red-500'
				: 'ring-gray-300 focus:ring-blue-500'}"
			placeholder="Password"
			value={confirmPassword}
			type={confirmPasswordType}
		/>
		<label for="confirm">Confirm password</label>
		{#if confirmPassword}
			<span class="absolute inset-y-0 right-0 flex items-center pl-2">
				<button
					class="p-1 focus:outline-none focus:shadow-outline"
					on:click={toggleConfirmPassword}
				>
					<See />
				</button>
			</span>
		{/if}
	</div>
	<div class="relative mt-6">
		<input
			required
			id="phone"
			type="text"
			bind:value={phone}
			class="peer w-full placeholder:text-transparent {invalidPhone
				? 'ring-red-500 focus:ring-red-500'
				: 'ring-gray-300 focus:ring-blue-500'}"
			placeholder="phone number"
		/>
		<label for="phone">Phone number</label>
	</div>
	<div class="flex flex-col items-center justify-center space-y-5">
		<button
			type="submit"
			class="flex items-center rounded-full justify-center w-full h-12 bg-blue-500 text-base font-medium leading-5 tracking-wide text-center text-white"
		>
			Sign up
		</button>
		<a
			href="#/login"
			class="flex items-center rounded-full justify-center w-full h-12 border border-blue-500 text-base font-medium leading-5 tracking-wide text-center text-blue-500"
		>
			Login with SSO
		</a>
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

<style lang="css">
	label {
		@apply absolute left-0 bg-white px-1 duration-100 ease-linear ml-1 -translate-y-2.5 translate-x-2 text-xs font-medium leading-4;
	}

	input[type='text'],
	input[type='password'] {
		@apply h-14 rounded-[4px] ring-2 focus:outline-none px-5 text-[17px] font-medium leading-6 tracking-[-0.15000000596046448px] text-left;
	}
</style>
