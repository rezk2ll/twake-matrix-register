<script lang="ts">
	import { t } from 'svelte-i18n';
	import { attemptToOpenApp, openRedirectLink } from '$lib/utils/url';
	import { redirectUrl as redirectUrlStore } from '../../../store';

	const open = () => {
		$redirectUrlStore ? openRedirectLink($redirectUrlStore, 'tmail') : attemptToOpenApp('tmail');
	};
</script>

<div class="flex flex-row space-x-5 bg-gray-100 p-5 rounded-3xl w-full">
	<div class="shrink items-center justify-center">
		<img src="/images/tmail.svg" alt="tmail" class="h-full" />
	</div>
	<div class="flex flex-col w-full items-start justify-start">
		<h1 class="hidden lg:block font-semibold text-2xl text-left">Tmail</h1>
		<h1 class="lg:hidden font-semibold text-base text-left">Twake Mail ({$t('mobile-app')})</h1>
		<span
			class="text-xs font-medium leading-4 tracking-[0.4000000059604645px] text-coolgray-400 text-left lg:pr-10"
			>{$t('tmail_description')}</span
		>
	</div>
	<button
		aria-label="open tmail"
		type="button"
		on:click={open}
		class="flex shrink items-center justify-center"
	>
		<img src="/images/arrow-forward.svg" alt="next" class="w-6" />
	</button>
</div>
