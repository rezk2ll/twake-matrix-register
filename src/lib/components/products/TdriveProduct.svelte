<script lang="ts">
	import { attemptToOpenApp, openRedirectLink } from '$lib/utils/url';
	import { redirectUrl as redirectUrlStore } from '../../../store';

	const open = () => {
		$redirectUrlStore ? openRedirectLink($redirectUrlStore, 'tdrive') : attemptToOpenApp('tdrive');
	};
</script>

<div class="flex flex-row space-x-5 bg-gray-100 p-5 rounded-3xl w-full">
	<div class="shrink items-center justify-center">
		<img src="/images/tdrive.svg" alt="tdrive" class="h-full" />
	</div>
	<div class="flex flex-col gap-1 w-full items-start justify-start">
		<h1 class="hidden lg:block font-semibold text-2xl text-left">Twake Drive</h1>
		<h1 class="lg:hidden font-semibold text-base text-left">Twake Drive (web)</h1>
		<span
			class="hidden lg:block text-xs font-medium leading-4 tracking-[0.4000000059604645px] text-coolgray-400 text-left lg:pr-10"
			>Share and collaborate on files securely, anywhere</span
		>
		<span
			class="lg:hidden font-medium leading-4 text-base tracking-[0.4000000059604645px] text-blue-500 text-left"
			>tdrive.linagora.com</span
		>
	</div>
	<button type="button" on:click={open} class="flex shrink items-center justify-center">
		<img src="/images/arrow-forward.svg" alt="next" class="w-6" />
	</button>
</div>
