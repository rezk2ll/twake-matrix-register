<script lang="ts">
	import { attemptToOpenApp, openRedirectLink } from '$lib/utils/url';
	import { redirectUrl as redirectUrlStore } from '../../../store';

	const open = () => {
		$redirectUrlStore ? openRedirectLink($redirectUrlStore, 'twake') : attemptToOpenApp('twake');
	};
</script>

<div class="flex flex-row space-x-5 bg-gray-100 p-5 pt-4 rounded-3xl w-full">
	<div class="items-center justify-center">
		<img src="/images/twakechat.svg" alt="twake" class="h-full" />
	</div>
	<div class="flex flex-col gap-2 w-full items-start justify-start">
		<h1 class="hidden md:block font-semibold text-2xl text-left">Twake</h1>
		<h1 class="md:hidden font-semibold text-base text-left">Twake Chat</h1>
		<span
			class="hidden md:block text-xs font-medium leading-4 tracking-[0.4000000059604645px] text-coolgray-400 text-left lg:pr-10"
			>Decentralised corporate communication starts here</span
		>
		<span
			class="md:hidden font-medium leading-4 tracking-[0.4000000059604645px] text-coolgray-400 text-left text-base"
			>Start your journey</span
		>
	</div>
	<button type="button" on:click={open} class="flex shrink items-center justify-center">
		<img src="/images/arrow-forward.svg" alt="next" class="w-6" />
	</button>
</div>
