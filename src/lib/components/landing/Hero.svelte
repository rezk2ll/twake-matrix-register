<script lang="ts">
	import Logo from '../logo/Logo.svelte';
</script>

<div class="flex flex-col space-y-20 font-[Inter] px-7 md:px-10 pt-56">
	<Logo />
	<div class="flex flex-col space-y-10 w-full h-screen xl:h-fit xl:w-5/6">
		<h1 class="hidden md:block text-4xl md:text-2xl xl:text-5xl font-semibold text-black">
			Decentralised messenger for new era of corporate communication
		</h1>
		<div class="md:hidden flex flex-col space-y-5">
			<h1 class=" text-2xl font-semibold text-black">
				Decentralised corporate communication starts here
			</h1>
			<a
				href="#start"
				class="flex items-center rounded-full justify-center w-full h-12 bg-blue-500 text-base font-medium leading-5 tracking-wide text-center text-white"
			>
				Start your journey
			</a>
		</div>
	</div>
</div>
