<script lang="ts">
	import { t } from 'svelte-i18n';
	import { activeTab } from '../../../store';
	import LoginForm from '../forms/LoginForm.svelte';
	import RegisterForm from '../forms/RegisterForm.svelte';
	import Logo from '../logo/Logo.svelte';
</script>

<div class="w-full flex flex-col md:flex-row justify-center h-screen lg:h-full">
	<div
		class="bg-white md:shadow-xl md:rounded-3xl flex flex-col space-y-5 w-full xl:w-10/12 2xl:w-7/12 md:px-16 py-6 h-full lg:h-fit"
		id="start"
	>
		<div class="lg:hidden flex h-6 w-full items-center justify-center">
			<Logo />
		</div>
		<div
			class="flex flex-row w-full items-center justify-center text-sm font-medium leading-5 tracking-wide text-center"
		>
			<div class="flex items-center justify-center w-full lg:p-3 box-border">
				<button
					aria-label={$t('Sign up')}
					class="h-10 bg-white w-full box-border border-b-2 {$activeTab === 'register'
						? 'text-primary border-[#0A84FF]'
						: 'border-gray-100 border-b'} "
					on:click={() => ($activeTab = 'register')}
				>
					{$t('Sign up')}
				</button>
			</div>
			<div
				class="flex items-center justify-center w-full h-10 py-2 box-border border-transparent border-b-2"
			>
				<button
					aria-label={$t('Sign in')}
					class="h-10 bg-white w-full box-border border-b-2 {$activeTab === 'login'
						? 'text-primary border-[#0A84FF]'
						: 'border-gray-100 border-b'} "
					on:click={() => ($activeTab = 'login')}
				>
					{$t('Sign in')}
				</button>
			</div>
		</div>
		<div
			class="text-3xl flex flex-col space-y-4 font-semibold leading-9 tracking-normal text-center w-full h-full"
		>
			{#if $activeTab === 'register'}
				<span>{$t('Sign up')}</span>
				<RegisterForm />
			{:else}
				<span>{$t('Sign in')}</span>
				<LoginForm />
			{/if}
		</div>
	</div>
</div>
