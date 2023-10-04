<script lang="ts">
	export let value: string;
	export let isInValid: boolean;
</script>

<div class="relative mt-6">
	<input
		required
		id="phone"
    name="phone"
		type="text"
		bind:value
		class="h-14 rounded-[4px] ring-2 focus:outline-none px-5 text-[17px] font-medium leading-6 tracking-[-0.15000000596046448px] text-left peer w-full placeholder:text-transparent {isInValid
			? 'ring-red-500 focus:ring-red-500'
			: 'ring-gray-300 focus:ring-blue-500'}"
		placeholder="phone number"
	/>
	<label
		for="phone"
		class="absolute left-0 bg-white px-1 duration-100 ease-linear ml-1 -translate-y-2.5 translate-x-2 text-xs font-medium leading-4"
		>Phone number</label
	>
	{#if value && isInValid === false}
		<span class="absolute inset-y-0 right-0 flex items-center pl-2">
			<slot />
		</span>
	{/if}
</div>
