<script lang="ts">
	import OutlineButton from './../button/OutlineButton.svelte';
	import TdriveProduct from '../products/TdriveProduct.svelte';
	import TmailProduct from '../products/TmailProduct.svelte';
	import TwakeProduct from '../products/TwakeProduct.svelte';
	import MobileSuccessInfo from '../user/MobileSuccessInfo.svelte';
	import SuccessInfo from '../user/SuccessInfo.svelte';

	export let user: string;
	export let id: string;
	export let phone: string;
</script>

<div
	class="md:space-y-5 py-5 bg-[#FFFBFE] md:shadow-xl rounded-3xl flex flex-col space-y-5 w-full md:w-6/12 xl:w-1/2 px-5 md:px-10"
>
	<div
		class="flex flex-col space-y-4 w-full items-center justify-center text-sm font-medium leading-5 tracking-wide text-center"
	>
		<div class="md:hidden w-full">
			<MobileSuccessInfo {user} {id} {phone} />
		</div>
		<div class="hidden md:block w-full">
			<SuccessInfo {user} />
		</div>

		<div class="flex flex-col space-y-4 w-full">
			<TwakeProduct />
			<TdriveProduct />
			<TmailProduct />
		</div>

		<div class="w-4/5 hidden md:block">
			<OutlineButton handler={() => {}}>Add recovery email</OutlineButton>
		</div>
	</div>
</div>
