<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col items-center justify-center space-y-4 w-full text-white">
	<div class="flex items-center justify-center w-full py-5">
		<h5 class="block font-sans text-3xl font-semibold leading-snug tracking-normal antialiased">
			🎉 Success
		</h5>
	</div>
	<div class="flex space-x-2">
		<div class="text-green-500">
			<svg
				class="w-6 sm:w-5 h-6 sm:h-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
		</div>

		<div class="text-sm tracking-wide mt-0 ml-4">
			Congratulations! {data.user ?? ''} 🥳 Your account has been successfully created! 🙌. you
			can now <a href="/login">login</a> or go back to the <a href="/">home page</a>
			<br />
		</div>
	</div>
</div>

<style lang="postcss">
	a {
		@apply text-blue-500 hover:text-blue-400
	}
</style>