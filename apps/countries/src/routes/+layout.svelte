<script lang="ts">
	import favicon from '$lib/assets/favicon.svg'
	import Header from '$lib/common/components/Header.svelte'
	import '../app.css'

	const { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="bg-base-200">
	<Header />
	<div class="container mx-auto py-10">
		{@render children?.()}
	</div>
</div>
