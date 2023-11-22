<script lang="ts">
	export let disabled: boolean = false;
</script>

<button
	type="submit"
	{disabled}
	class="flex items-center rounded-full justify-center w-full h-12 {disabled
		? 'bg-slate-200 text-slate-400'
		: 'bg-blue-500 text-white'} text-base font-medium leading-5 tracking-wide text-center "
>
	<slot />
</button>
