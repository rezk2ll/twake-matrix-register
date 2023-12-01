<script lang="ts">
	import { enhance } from '$app/forms';
	import { form } from '../../../store';
	import SubmitButton from '../button/SubmitButton.svelte';
	import PasswordField from '../input/PasswordField.svelte';
	import TextField from '../input/TextField.svelte';
	import OutlineLink from '../link/OutlineLink.svelte';

	$: failedLogin = $form?.failed_login === true;
</script>

<form use:enhance action="?/login" method="POST" class="flex flex-col space-y-4 px-4 py-3 xl:px-3 lg:space-y-5 font-[Inter] w-full h-full">
	<TextField
		name="login"
		label="Cellphone / Username / Email"
		value=""
		placeholder="login"
		bind:isInValid={failedLogin}
		feedback={false}
	/>
	<PasswordField
		label="Password"
		name="password"
		value=""
		isInvalid={failedLogin}
		placeholder="Password"
		feedback={false}
	/>
	{#if failedLogin}
		<span class="text-xs font-medium leading-4 tracking-[0.4000000059604645px] text-left text-red-500 px-5">
			Invalid credentials
		</span>
	{/if}
	<div class="flex flex-col items-center space-y-5 flex-1 justify-end">
		<SubmitButton ariaLabel="Sign in">Sign in</SubmitButton>
		<OutlineLink href="#/login">Login with SSO</OutlineLink>
	</div>

	<a href="#/recover" class="text-primary text-sm font-medium leading-5 tracking-wide"
		>recover password</a
	>
</form>
