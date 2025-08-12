<script>
	import { MoonIcon, SunIcon } from '@lucide/svelte'

	let isDarkMode = $state(false)

	// Function to toggle the dark mode state
	const toggleDarkMode = () => {
		isDarkMode = !isDarkMode
		// Save the theme preference to local storage
		const theme = isDarkMode ? 'dark' : 'light'
		localStorage.setItem('theme', theme)
		document.documentElement.setAttribute('data-theme', theme)
	}

	// Effect to apply the dark mode class to the <html> element
	$effect(() => {
		const theme = isDarkMode ? 'dark' : 'light'
		document.documentElement.setAttribute('data-theme', theme)
	})
</script>

<nav class="navbar px-20 bg-base-100 shadow-md">
	<div class="flex-1">
		<a href="/" class="text-xl font-semibold">Where in the world?</a>
	</div>
	<div class="flex-none">
		<button onclick={toggleDarkMode} class="btn btn-ghost">
			{#if isDarkMode}
				<SunIcon />
				<span class="hidden sm:inline">Light Mode</span>
			{:else}
				<MoonIcon size={16} />
				<span class="hidden sm:inline">Dark Mode</span>
			{/if}
		</button>
	</div>
</nav>
