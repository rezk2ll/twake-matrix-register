<script lang="ts">
	import { t } from 'svelte-i18n';

	export let user: string;
</script>

<div
	class="flex flex-col space-y-4 w-full items-center justify-center text-sm font-medium leading-5 tracking-wide text-center"
>
	<div class="flex flex-col">
		<h1 class="text-[28px] font-semibold leading-9 tracking-normal text-center px-12">
			{$t('Congratulations')},
		</h1>
		<h1 class="text-[28px] font-semibold leading-9 tracking-normal text-center px-12">
			{user}!
		</h1>
	</div>

	<span class="text-[17px] font-medium leading-6 tracking-tight text-center text-gray-400"
		>{$t('You are all set up')}</span
	>
	<span class="text-[17px] font-medium leading-6 tracking-wide text-center text-black"
		>{$t('logged_twakeid_choose')}</span
	>
</div>
