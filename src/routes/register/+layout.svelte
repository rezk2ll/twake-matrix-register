<script>
	import Hero from '$lib/components/landing/Hero.svelte';
</script>

<div class="flex space-x-4 w-full min-w-screen min-h-screen align-middle md:px-52 pt-20">
	<div class="w-full overflow-hidden">
		<div class="flex flex-col md:flex-row w-full items-center justify-center">
			<Hero />
			<div class="rounded-xl bg-white shadow-xl px-2 py-16 md:px-16 w-full md:w-2/3">
				<slot />
			</div>
		</div>
	</div>
</div>
