<script lang="ts">
	import OutlineButton from './../button/OutlineButton.svelte';
	import TdriveProduct from '../products/TdriveProduct.svelte';
	import TmailProduct from '../products/TmailProduct.svelte';
	import TwakeProduct from '../products/TwakeProduct.svelte';

	export let user: string;
</script>

<div
	class="md:space-y-5 py-5 bg-[#FFFBFE] shadow-xl rounded-3xl flex flex-col space-y-5 w-1/2 px-10"
>
	<div
		class="flex flex-col space-y-4 w-full items-center justify-center text-sm font-medium leading-5 tracking-wide text-center"
	>
  <div class="flex flex-col">
		<h1 class="text-[28px] font-semibold leading-9 tracking-normal text-center px-12">
			Congratulations,
		</h1>
		<h1 class="text-[28px] font-semibold leading-9 tracking-normal text-center px-12">
			{user}!
		</h1>
  </div>

		<span
			class="text-[17px] font-medium leading-6 tracking-[-0.15000000596046448px] text-center text-gray-400"
			>You are all set up.</span
		>
		<span class="text-[17px] font-medium leading-6 tracking-wide text-center text-black"
			>As Twake ID is a unified authentication mechanism you can log into any Linagora product via
			the same credentials</span
		>

		<div class="flex flex-col space-y-4 w-full">
			<TwakeProduct />
			<TdriveProduct />
			<TmailProduct />
		</div>

		<div class="w-4/5">
			<OutlineButton handler={() => {}}>Add recovery email</OutlineButton>
		</div>
	</div>
</div>
