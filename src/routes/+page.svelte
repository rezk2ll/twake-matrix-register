<script>
	import AccessSelect from '$lib/components/landing/AccessSelect.svelte';
	import Hero from '$lib/components/landing/Hero.svelte';
</script>

<div
	class="flex space-x-4 w-full min-w-screen min-h-screen bg-gray-900 items-center justify-center px-5 py-5"
>
	<div
		class="rounded-3xl shadow-xl w-full overflow-hidden max-w-6xl"
	>
		<div class="flex flex-col md:flex-row w-full items-center justify-center">
			<Hero />
			<AccessSelect />
		</div>
	</div>
</div>
