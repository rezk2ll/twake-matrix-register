<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import PhoneInput from '$lib/components/otp/PhoneInput.svelte';
	import CodeInput from '$lib/components/otp/CodeInput.svelte';
	import Error from '$lib/components/dispaly/Error.svelte';

	export let data: PageData;
	export let form: ActionData;
</script>

<div
	class="flex space-x-4 w-full min-w-screen min-h-screen bg-gray-900 items-center justify-center px-5 py-5"
>
	{#if form?.success}
		{#if data.mask}
			<CodeInput mask={data.mask} />
		{/if}
	{:else if form?.success === false}
		<Error />
	{:else}
		<PhoneInput />
	{/if}
</div>
