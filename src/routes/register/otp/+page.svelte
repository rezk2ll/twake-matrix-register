<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import CodeInput from '$lib/components/otp/VerifyCode.svelte';
	import Error from '$lib/components/dispaly/Error.svelte';

	export let form: ActionData;
	export let data: PageData;
</script>

{#if form?.error}
	<Error />
{:else}
	<CodeInput mask={data.mask} valid={!form?.incorrect} />
{/if}
