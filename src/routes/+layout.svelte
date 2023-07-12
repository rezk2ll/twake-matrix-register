<script>
	import '../app.css';
	import Nav from '$lib/components/nav/Nav.svelte';
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="description" content="Twake on matrix registration" />
	<meta name="keywords" content="Sveltekit, Matrix, Linagora, Twake" />
	<meta name="author" content="Linagora" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Sign up on Twake</title>
</svelte:head>

<div class="min-h-screen w-full overflow-hidden bg-gray-900 flex flex-col">
  <Nav />
	<slot />
</div>
