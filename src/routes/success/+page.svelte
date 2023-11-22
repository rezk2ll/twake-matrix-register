<script lang="ts">
	import { redirectUrl as redirectUrlStore } from './../../store';
	import type { PageData } from './$types';
	import SuccessCard from '$lib/components/landing/SuccessCard.svelte';
	import LoggedUser from '$lib/components/nav/LoggedUser.svelte';
	import LoggedHero from '$lib/components/landing/LoggedHero.svelte';

	export let data: PageData;

	$: user = `${data.firstName} ${data.lastName}`;
	$: username = data.username ?? '';
	$: phone = data.phone ?? '';
	$: redirectUrlStore.set(data.redirectUrl);
</script>

<div class="bg-white w-full min-h-screen">
	<div class="flex flex-col space-y-5">
		<div class="h-20 flex-row w-full p-10 hidden md:flex">
			<div class="w-full" />
			<div class="right-0 w-52">
				<LoggedUser {username} {user} />
			</div>
		</div>
		<div class="flex space-x-4 w-full xl:px-20 2xl:px-48 lg:py-4">
			<div class="w-full overflow-hidden">
				<div class="flex flex-col-reverse lg:flex-row-reverse w-full py-10 lg:px-10">
					<SuccessCard {user} bind:id={username} {phone} />
					<div class="hidden lg:block w-full">
						<LoggedHero />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
