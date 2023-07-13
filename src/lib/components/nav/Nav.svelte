<script lang="ts">
	import GithubIcon from './GithubIcon.svelte';
	import Menu from './Menu.svelte';
	import { fly } from 'svelte/transition';

	let open = false;

	const toggle = () => (open = !open);
</script>

<nav class="p-6 md:fixed sm:relative bg-clip-border shadow-sm shadow-slate-800 w-full">
	<div class="flex items-center justify-between">
		<div class="inline-flex items-center justify-between">
			<a
				class="text-2xl font-bold text-gray-800 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:text-3xl"
				href="/">Twake</a
			>
		</div>
		<div class="md:hidden flex">
			<button
				on:click={toggle}
				type="button"
				class="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400"
				aria-label="toggle menu"
			>
				{#if !open}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 8h16M4 16h16" />
					</svg>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				{/if}
			</button>
			<GithubIcon />
		</div>
		<div class="flex-initial hidden md:block">
			<div class="flex justify-center items-center">
				<Menu />
				<GithubIcon />
			</div>
		</div>
	</div>

	{#if open}
		<div class="md:hidden" transition:fly>
			<div class="flex flex-col pt-4 space-y-2">
				<Menu />
			</div>
		</div>
	{/if}
</nav>
