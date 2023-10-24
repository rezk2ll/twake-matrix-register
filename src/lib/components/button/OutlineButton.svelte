<script lang="ts">
  export let handler: () => void;
	export let disabled: boolean = false;
</script>

<button
	type="button"
  on:click={handler}
	{disabled}
	class="flex items-center rounded-full justify-center w-full h-12 border border-blue-500 { disabled ? ' border-gray-300 text-gray-300': '' } text-base font-medium leading-5 tracking-wide text-center text-blue-500"
>
	<slot />
</button>
