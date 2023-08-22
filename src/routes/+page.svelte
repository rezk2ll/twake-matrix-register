<script>
	import AccessSelect from '$lib/components/landing/AccessSelect.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
</script>

<div
	class="flex space-x-4 w-full min-w-screen min-h-screen align-middle lg:px-52 py-5"
>
	<div class="w-full overflow-hidden">
		<div class="flex flex-col md:flex-row w-full items-center justify-center">
			<Hero />
			<AccessSelect />
		</div>
	</div>
</div>
