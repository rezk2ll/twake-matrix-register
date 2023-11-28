<script lang="ts">
	export let show: boolean = false;
	export let title: string;
	export let description: string;
</script>

<div class="flex flex-col text-left text-gray-600 truncate space-y-4 lg:space-y-2">
	<h1
		class="text-2xl not-italic font-semibold leading-8 text-[color:var(--m-3-sys-light-bg-surface-on-surface-variant,#1C1B1F)] lg:text-[17px] lg:not-italic lg:font-bold lg:leading-6 lg:tracking-[-0.15px]"
	>
		{title}
	</h1>

	<span
		class="text-[color:var(--m-3-sys-light-bg-surface-on-surface-variant,#1C1B1F)] text-sm not-italic font-medium leading-5 tracking-[0.25px] whitespace-break-spaces"
	>
		{description}
	</span>

	<button
		type="button"
		class="px-3 py-2 flex items-end justify-end lg:items-start lg:justify-start"
		on:click={() => (show = false)}
	>
		<span
			class="text-[color:var(--m-3-sys-light-primary-primary,#0A84FF)] text-center text-sm not-italic font-medium leading-5 tracking-[0.1px]"
		>
			Ok, got it
		</span>
	</button>
</div>
