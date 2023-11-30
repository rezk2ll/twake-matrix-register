<script lang="ts">
	export let handler: () => void;
	export let disabled: boolean = false;
	export let ariaLabel: string = '';
</script>

<button
	aria-label={ariaLabel}
	type="button"
	on:click={handler}
	{disabled}
	class="flex items-center rounded-full justify-center w-full h-12 border border-primary {disabled
		? ' border-gray-300 text-gray-300'
		: ''} text-base font-medium leading-5 tracking-wide text-center text-primary"
>
	<slot />
</button>
