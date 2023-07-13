<script>
	import { enhance } from '$app/forms';
</script>

<div class="flex flex-col items-center justify-center p-10 space-y-2">
	<h1 class="text-3xl font-bold text-center mb-4 cursor-pointer text-white w-full">
		Create An Account
	</h1>
	<form action="/register/user" method="POST" class="flex flex-col space-y-4 w-full" use:enhance>
		<input
			type="text"
			placeholder="Nick name"
			required
			class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
		/>
		<input
			type="text"
			placeholder="Dispaly name"
			class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
		/>
		<input
			type="text"
			placeholder="Recovery email"
			class="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
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

<style lang="postcss">
	input[type='text'] {
		@apply w-full outline-none p-3 rounded-md m-1 border-solid border-2 border-blue-700 focus:border-blue-500 font-bold text-white transition-all bg-gray-900;
	}
</style>
