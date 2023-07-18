<script lang="ts">
	import type { ActionData } from './$types';
	import PhoneInput from '$lib/components/otp/PhoneInput.svelte';
	import Error from '$lib/components/dispaly/Error.svelte';

	export let form: ActionData;
</script>

{#if form?.error}
	<Error />
{:else}
	<PhoneInput invalid={form?.invalid || form?.taken} />
{/if}
