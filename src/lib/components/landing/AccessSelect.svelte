<script lang="ts">
	import type { Tab } from '../../../types';
	import LoginForm from '../forms/LoginForm.svelte';
	import RegisterForm from '../forms/RegisterForm.svelte';

	let active: Tab = 'register';
</script>

<div class="md:space-y-5 pt-10 bg-white rounded-3xl flex flex-col space-y-5 w-7/12 p-10">
	<div
		class="flex flex-row w-full items-center justify-center text-sm font-medium leading-5 tracking-wide text-center"
	>
		<div class="flex items-center justify-center w-full py-2 box-border">
			<button
				class="h-10 bg-white w-full box-border border-b-2 {active === 'register'
					? 'text-blue-500  border-blue-500'
					: 'border-gray-100 border-b'} "
				on:click={() => (active = 'register')}
			>
				Sign up
			</button>
		</div>
		<div
			class="flex items-center justify-center w-full h-10 py-2 box-border border-transparent border-b-2"
		>
			<button
				class="h-10 bg-white w-full box-border border-b-2 {active === 'login'
					? 'text-blue-500 border-blue-500'
					: 'border-gray-100 border-b'} "
				on:click={() => (active = 'login')}
			>
				Sign in
			</button>
		</div>
	</div>
	<div class="text-3xl font-semibold leading-9 tracking-normal text-center w-full">
		{#if active === 'register'}
			<span>Sign up</span>
			<RegisterForm />
		{:else}
			<span>Sign in</span>
			<LoginForm />
		{/if}
	</div>
</div>
