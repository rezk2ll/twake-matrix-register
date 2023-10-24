<script lang="ts">
	import TwakeIcon from '../logo/TwakeIcon.svelte';
</script>

<div class="flex flex-col space-y-20 font-[Inter] px-10 pt-20 w-full">
	<div
		class="flex space-x-2 rounded-full border border-gray-400 p-5 w-48 items-center justify-center"
	>
		<TwakeIcon />
		<h1 class="text-4xl md:text-6xl xl:text-5xl font-semibold text-black">ID</h1>
	</div>
	<div class="flex flex-col space-y-6 w-full">
		<h1
			class="text-4xl md:text-5xl xl:text-5xl text-black font-semibold leading-[52px] tracking-normal text-left;"
		>
			Twake ID - one account for everything
		</h1>

		<p class="text-[17px] font-medium leading-6 tracking-tight text-left text-gray-400 w-3/4">
			Chat, share files, exchange email in a secure and safe way using the same account across all
			devices and products.
		</p>

		<div class="flex flex-row space-x-8">
			<img src="/images/twakechat.svg" alt="twake" class="w-14 h-14" />
			<img src="/images/tmail.svg" alt="tmail" class="w-14 h-14" />
			<img src="/images/tdrive.svg" alt="tdrive" class="w-14 h-14" />
		</div>
	</div>
</div>
