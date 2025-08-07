<script>
	import Footer from '$lib/common/components/Footer.svelte'
	import Header from '$lib/common/components/Header.svelte'
	import BoostSection from '$lib/home/components/BoostSection.svelte'
	import Hero from '$lib/home/components/Hero.svelte'
	import LinkCard from '$lib/home/components/LinkCard.svelte'
	import ShortenForm from '$lib/home/components/ShortenForm.svelte'
	import Statistics from '$lib/home/components/Statistics.svelte'
	import { onMount } from 'svelte'
	import { cubicOut } from 'svelte/easing'
	import { tweened } from 'svelte/motion'
	import { writable } from 'svelte/store'
	import { v4 as uuidv4 } from 'uuid'

	// State to hold the list of shortened links
	let links = $state([])

	// A writable store to manage the links, for use with effects and local storage
	const linksStore = writable([])

	// Use a derived state to get the value from the store
	// $derived(() => {
	// 	links = $linksStore
	// })

	// Use a Svelte effect to synchronize the links with local storage.
	// This effect runs whenever linksStore changes.
	$effect(() => {
		// Only run this effect if `links` is not null to avoid initial false state.
		if (links) {
			localStorage.setItem('shortened-links', JSON.stringify(links))
		}
	})

	// Load links from local storage on component mount
	onMount(() => {
		try {
			const storedLinks = localStorage.getItem('shortened-links')
			if (storedLinks) {
				linksStore.set(JSON.parse(storedLinks))
			}
		} catch (error) {
			console.error('Failed to load links from local storage:', error)
		}
	})

	// Function to handle the API call and add the new link
	async function handleShorten(originalUrl) {
		try {
			const response = await fetch('https://api.cleanuri.com/v1/shorten', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					url: originalUrl,
				}),
			})

			const data = await response.json()

			if (response.ok && data.result_url) {
				const newLink = {
					id: uuidv4(),
					original: originalUrl,
					shortened: data.result_url,
					copied: false,
				}
				linksStore.update((currentLinks) => [newLink, ...currentLinks])
				return {
					success: true,
				}
			} else {
				return {
					success: false,
					message: data.error || 'Something went wrong. Please try a different URL.',
				}
			}
		} catch (error) {
			console.error('API request failed:', error)
			return {
				success: false,
				message: 'Network error. Please check your internet connection.',
			}
		}
	}

	// Function to update the copied state of a link
	function handleCopy(id) {
		linksStore.update((currentLinks) =>
			currentLinks.map((link) =>
				link.id === id ? { ...link, copied: true } : { ...link, copied: false },
			),
		)
	}

	// Function to remove all links from the list and local storage
	function clearAllLinks() {
		linksStore.set([])
	}
</script>

<div class="flex flex-col min-h-screen font-sans bg-base-100 text-base-content">
	<!-- Header Component -->
	<Header />

	<main class="flex-grow">
		<!-- Hero Section -->
		<Hero />

		<!-- Main Content Area -->
		<section class="bg-base-200 py-24 px-4 sm:px-6 lg:px-8">
			<div class="container mx-auto">
				<!-- Shorten Form and Link List -->
				<div class="relative -top-20 md:-top-16">
					<ShortenForm onshorten={handleShorten} />

					{#if links.length > 0}
						<div class="mt-8 flex flex-col gap-4">
							<div class="flex justify-end">
								<button onclick={clearAllLinks} class="btn btn-ghost btn-sm">
									Clear All
								</button>
							</div>
							{#each links as link (link.id)}
								<LinkCard
									originalUrl={link.original}
									shortenedUrl={link.shortened}
									copied={link.copied}
									oncopy={() => handleCopy(link.id)}
								/>
							{/each}
						</div>
					{/if}
				</div>

				<!-- Advanced Statistics Section -->
				<Statistics />
			</div>
		</section>

		<!-- Boost your links section -->
		<BoostSection />
	</main>

	<!-- Footer Component -->
	<Footer />
</div>
