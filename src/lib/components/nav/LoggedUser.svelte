<script lang="ts">
	import Avatar from './../icons/Avatar.svelte';
	export let user: string;
	export let username: string;
</script>

<div class="flex flex-row space-x-2 items-center justify-center">
	<Avatar />
	<div class="flex flex-col gap-0">
		<h1 class=" text-[15px] font-semibold leading-5 tracking-[0px] text-left text-black">{user}</h1>
		<span class="text-[13px] font-normal leading-4 tracking-[0px] text-left text-gray-500"
			>@{username}</span
		>
	</div>
</div>
