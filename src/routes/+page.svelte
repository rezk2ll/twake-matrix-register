<script>
	import AccessSelect from '$lib/components/landing/AccessSelect.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
</script>

<div
	class="flex space-x-4 w-full min-h-screen 2xl:px-52 py-5 pt-20"
>
	<div class="w-full overflow-hidden">
		<div class="flex flex-col md:flex-row w-full">
			<Hero />
			<AccessSelect />
		</div>
	</div>
</div>
