<script lang="ts">
  export let handler: () => void;
</script>

<button
	type="button"
  on:click={handler}
	class="flex items-center rounded-full justify-center w-full h-12 border border-blue-500 text-base font-medium leading-5 tracking-wide text-center text-blue-500"
>
	<slot />
</button>
