<script>
	import '../app.css';
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="description" content="Twake on matrix registration" />
	<meta name="keywords" content="Sveltekit, Matrix, Linagora, Twake" />
	<meta name="author" content="Linagora" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link href="https://fonts.googleapis.com/css?family=Inter" rel="stylesheet" />
	<title>Sign up on Twake</title>
</svelte:head>

<div class="min-h-screen w-full overflow-hidden gradiant flex flex-col font-[Inter]">
	<div class="bg-layout bg-no-repeat w-full">
		<slot />
		<div class="h-36 fixed bottom-0 w-full gradiant -z-30" />
	</div>
</div>

<style>
	.gradiant {
		background: linear-gradient(
				105.88deg,
				rgba(248, 169, 52, 0.2) 0%,
				rgba(203, 40, 206, 0.2) 43.6%,
				rgba(10, 132, 255, 0.2) 100%
			),
			linear-gradient(0deg, #ffffff, #ffffff);
	}
</style>
