<script lang="ts">
	import { clickOutside } from './../../utils/html';
	export let value: string;
	export let nickNames: string[];
	export let show: boolean = true;

	const setNickName = (val: string) => {
		value = val;
		show = false;
	};

	$: display = show;
</script>

{#if display}
	<span
		class="text-xs font-medium leading-4 tracking-[0.4000000059604645px] text-left text-red-500 px-5"
		>Sorry, this username is already taken
	</span>
{/if}
<div
	use:clickOutside={() => display = false}
	class="{display
		? 'block'
		: 'hidden'} absolute z-10 mt-2 pl-5 py-2 w-80 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
>
	<div class="py-1" role="none">
		<div
			class="flex items-start justify-start text-[22px] font-semibold leading-7 tracking-normal text-left w-fit"
		>
			Available usernames
		</div>
		<div class="flex flex-col space-y-2 text-xs text-left py-2">
			{#each nickNames as nickName}
				<button
					type="button"
					class="rounded-xl bg-indigo-50 p-3 text-left w-fit"
					on:click={() => setNickName(nickName)}
				>
					{nickName}
				</button>
			{/each}
		</div>
	</div>
</div>
