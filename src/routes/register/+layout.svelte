<script>
	import Hero from '$lib/components/landing/Hero.svelte';
</script>

<div class="flex space-x-4 w-full min-w-screen min-h-screen align-middle 2xl:px-52 py-5 pt-20 sm:px-10 lg:pt-32">
	<div class="w-full overflow-hidden">
		<div class="flex flex-col md:flex-row w-full items-center justify-center md:items-start">
			<div class="hidden lg:block h-full">
				<Hero />
			</div>
			<div class="rounded-xl bg-white shadow-xl px-2 py-16 md:px-16 w-full sm:w-2/3 lg:w-2/3 2xl:w-1/2 md:w-full mt-24 lg:mt-0">
				<slot />
			</div>
		</div>
	</div>
</div>
