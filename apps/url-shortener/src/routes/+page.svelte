<script lang="ts">
	import Footer from '$lib/common/components/Footer.svelte'
	import Header from '$lib/common/components/Header.svelte'
	import { LocalStorage } from '$lib/common/service/localStorage.svelte.js'
	import BoostSection from '$lib/home/components/BoostSection.svelte'
	import Hero from '$lib/home/components/Hero.svelte'
	import LinkCard from '$lib/home/components/LinkCard.svelte'
	import Statistics from '$lib/home/components/Statistics.svelte'
	import type { ActionData } from './$types.js'
	import { type FormResult, superForm } from 'sveltekit-superforms'
	import { v4 } from 'uuid'

	interface Link {
		id: string
		original: string
		shortened: string
	}

	// A writable store to manage the links, for use with effects and local storage
	const { data } = $props()
	const { errors, enhance } = superForm(data.form, {
		resetForm: false,
		onUpdate: ({ form, result }) => {
			// The `form` object in this callback has the `result` property
			console.log('Form updated:', form, result)
			const action = result.data as FormResult<ActionData>
			if (form.valid && action.result?.shortenedUrl) {
				urlStorage.current = urlStorage.current.concat([
					{
						id: v4(),
						original: action.result.originalUrl,
						shortened: action.result.shortenedUrl,
					},
				])
			}
		},
	})

	let urlInput = $state('')

	const urlStorage = new LocalStorage<Link[]>('urlShotenerLinks', [])
	// Function to update the copied state of a link
	function handleCopy(id: string) {
		// 	urlStorage.update((currentLinks) =>
		// 		currentLinks.map((link) =>
		// 			link.id === id ? { ...link, copied: true } : { ...link, copied: false },
		// 		),
		// 	)
	}

	// Function to remove all links from the list and local storage
	function clearAllLinks() {
		urlStorage.current = []
	}
</script>

<div class="flex flex-col min-h-screen font-sans bg-base-100 text-base-content">
	<!-- Header Component -->
	<Header />

	<main class="flex-grow">
		<!-- Hero Section -->
		<Hero />

		<!-- Main Content Area -->
		<section class="bg-primary py-24">
			<div class="container mx-auto">
				<!-- Shorten Form and Link List -->
				<div class="relative -top-20 md:-top-16">
					<div class="container flex justify-center -mt-24">
						<form
							method="POST"
							use:enhance
							class="bg-gray-800 p-8 md:p-12 rounded-lg shadow-xl w-full"
						>
							<div class="flex flex-col md:flex-row items-center gap-4">
								<input
									type="text"
									name="url"
									bind:value={urlInput}
									class="input input-lg w-full rounded"
									placeholder="Shorten a link here..."
									aria-invalid={!!$errors.url}
									aria-describedby="url-error"
								/>
								<button
									type="submit"
									class="btn btn-primary rounded-lg btn-lg w-full md:w-auto"
								>
									Shorten It!
								</button>
							</div>
							{#if $errors.url}
								<p id="url-error" class="text-error mt-2">{$errors.url}</p>
							{/if}
						</form>
					</div>

					{#if urlStorage.current.length > 0}
						<div class="mt-8 flex flex-col gap-4">
							<div class="flex justify-end">
								<button onclick={clearAllLinks} class="btn btn-ghost btn-sm">
									Clear All
								</button>
							</div>
							{#each urlStorage.current as link (link.id)}
								<LinkCard
									originalUrl={link.original}
									shortenedUrl={link.shortened}
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
