<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import Fail from '$lib/components/dispaly/Fail.svelte';
	import { validateEmail } from '$lib/utils/email';
	import { validatePassword } from '$lib/utils/password';

	export let form: ActionData;
	let invalidNickname: boolean = false;
	let invalidEmail: boolean = false;

	let nickname: string;
	let email: string;
	let password: string;
	let confirmPassword: string;

	$: invalidNickname = !!form?.taken;
	$: invalidEmail = !!email && !validateEmail(email);
	$: invalidPassword = password && !validatePassword(password);
	$: invalidConfirmPassword = password && password !== confirmPassword;
</script>

<div class="flex flex-col items-center justify-center p-10 space-y-2">
	<h1 class="text-3xl font-bold text-center mb-4 cursor-pointer text-white w-full">
		Create An Account
	</h1>
	<form action="/register/user" method="POST" class="flex flex-col space-y-4 w-full" use:enhance>
		{#if form?.missing}
			<Fail>Nickname is missing</Fail>
		{/if}

		{#if form?.taken}
			<Fail>Nickname is not available</Fail>
		{/if}

		{#if form?.invalid_password}
			<Fail>Invalid password</Fail>
		{/if}
		{#if form?.email_invalid}
			<Fail>Invalid email</Fail>
		{/if}
		{#if form?.email_unavailable}
			<Fail>Email is unavailable</Fail>
		{/if}
		<input
			bind:value={nickname}
			type="text"
			name="nickname"
			placeholder="Nickname"
			required
			class="{invalidNickname
				? 'border-red-700 focus:border-red-500'
				: 'border-blue-700 focus:border-blue-500'}
				block text-sm py-3 px-4 outline-none w-full p-3 rounded-md m-1 border-solid border-2 font-bold text-white transition-all bg-gray-900"
		/>
		<input
			type="text"
			name="display_name"
			placeholder="Dispaly name"
			class="block text-sm py-3 px-4 outline-none w-full p-3 rounded-md m-1 border-solid border-2 border-blue-700 focus:border-blue-500 font-bold text-white transition-all bg-gray-900"
		/>
		<input
			type="email"
			name="recovery_email"
			placeholder="Recovery email"
			bind:value={email}
			class="{invalidEmail
				? 'border-red-700 focus:border-red-500'
				: 'border-blue-700 focus:border-blue-500'} block text-sm py-3 px-4 outline-none w-full p-3 rounded-md m-1 border-solid border-2 font-bold text-white transition-all bg-gray-900"
		/>
		<input
			type="password"
			name="password"
			bind:value={password}
			required
			placeholder="Password"
			class="{invalidPassword
				? 'border-red-700 focus:border-red-500'
				: 'border-blue-700 focus:border-blue-500'} block text-sm py-3 px-4 outline-none w-full p-3 rounded-md m-1 border-solid border-2 font-bold text-white transition-all bg-gray-900"
		/>
		<h3 class="text-slate-500 text-sm pl-1">
			the password must be at least 8 characters long, with at least a symbol, upper and lower case
			letters and a number
		</h3>
		<input
			type="password"
			name="password"
			bind:value={confirmPassword}
			required
			placeholder="Confirm password"
			class="{invalidConfirmPassword
				? 'border-red-700 focus:border-red-500'
				: 'border-blue-700 focus:border-blue-500'} block text-sm py-3 px-4 outline-none w-full p-3 rounded-md m-1 border-solid border-2 font-bold text-white transition-all bg-gray-900"
		/>
		<input
			type="submit"
			value="Sign up"
			class="flex items-center cursor-pointer font-bold justify-center m-1 p-3 w-full transform rounded-md bg-blue-500 capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
		/>
		<div class="flex items-center justify-center">
			<h3 class="text-slate-500">
				Already have an account? <a href="/login" class="underline text-blue-300">Sign In</a>
			</h3>
		</div>
	</form>
</div>
