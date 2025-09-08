<script>
	import '../app.css';
	
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/logo/icon_pasti_new.ico" />
</svelte:head>

{@render children?.()}

