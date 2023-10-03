<script lang="ts">
	let login = '';
	let password = '';
	$: invalidLogin = login.length && login.length < 3;
</script>

<form action="" class="flex flex-col space-y-6 px-10">
	<div class="relative mt-6">
		<input
			required
			id="firstname"
			bind:value={login}
			type="text"
			class="peer w-full placeholder:text-transparent {invalidLogin
				? 'ring-red-500 focus:ring-red-500'
				: 'ring-gray-300 focus:ring-blue-500'}"
			placeholder="Fist name"
		/>
		<label for="firstname">Cellphone/ Username/ Email</label>
	</div>
	<div class="relative mt-6">
		<input
			required
			id="firstname"
			bind:value={password}
			type="password"
			class="peer w-full placeholder:text-transparent {invalidLogin
				? 'ring-red-500 focus:ring-red-500'
				: 'ring-gray-300 focus:ring-blue-500'}"
			placeholder="Fist name"
		/>
		<label for="firstname">Password</label>
	</div>

	<div class="flex flex-col items-center justify-center space-y-5">
		<button
			type="submit"
			class="flex items-center rounded-full justify-center w-full h-12 bg-blue-500 text-base font-medium leading-5 tracking-wide text-center text-white"
		>
			Sign in
		</button>
		<a
			href="#/login"
			class="flex items-center rounded-full justify-center w-full h-10 border border-blue-500 text-base font-medium leading-5 tracking-wide text-center text-blue-500"
		>
			Login with SSO
		</a>
	</div>

	<a href="#/recover" class="text-blue-500 text-sm font-medium leading-5 tracking-wide"
		>recover password</a
	>
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
