<script lang="ts">
	import SubmitButton from '../button/SubmitButton.svelte';
	import PasswordField from '../input/PasswordField.svelte';
	import TextField from '../input/TextField.svelte';
	import OutlineLink from '../link/OutlineLink.svelte';

	let login = '';
	let password = '';
	$: invalidLogin = login.length > 0 && login.length < 3;
</script>

<form action="" class="flex flex-col space-y-6">
	<TextField
		name="login"
		label="Cellphone / Username / Email"
		bind:value={login}
		placeholder="login"
		bind:isInValid={invalidLogin}
	/>
	<PasswordField
		label="Password"
		name="password"
		bind:value={password}
		isInvalid={false}
		placeholder="Password"
		feedback={false}
	/>

	<div class="flex flex-col items-center justify-center space-y-5">
		<SubmitButton>Sign in</SubmitButton>
		<OutlineLink href="#/login">Login with SSO</OutlineLink>
	</div>

	<a href="#/recover" class="text-blue-500 text-sm font-medium leading-5 tracking-wide"
		>recover password</a
	>
</form>
