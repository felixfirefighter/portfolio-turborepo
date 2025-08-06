<script lang="ts">
	import { Dice5Icon } from '@lucide/svelte'
	import clsx from 'clsx'
	import { onMount } from 'svelte'

	interface Advice {
		id: number
		advice: string
	}

	// Use $state for reactive variables
	let advice = $state<Advice | null>(null)
	let isLoading = $state(false)

	// Define the API URL
	const ADVICE_API_URL = 'https://api.adviceslip.com/advice'

	// Function to fetch new advice
	const fetchAdvice = async () => {
		isLoading = true
		try {
			const response = await fetch(ADVICE_API_URL)
			const data = await response.json()
			advice = data.slip
		} catch (error) {
			console.error('Failed to fetch advice:', error)
			// Handle error state gracefully
			advice = { id: 0, advice: 'Failed to load advice. Please try again.' }
		} finally {
			isLoading = false
		}
	}

	// Use onMount to fetch advice when the component is first rendered
	onMount(() => {
		fetchAdvice()
	})
</script>

<div class="min-h-screen grid place-items-center p-4">
	<div
		class="card w-full max-w-sm bg-neutral rounded-box p-8 shadow-xl relative"
	>
		<div class="flex flex-col items-center gap-4">
			<h1 class="text-xs text-primary font-bold uppercase tracking-[0.2em]">
				Advice #{isLoading || !advice ? '...' : advice.id}
			</h1>
			<p
				class={clsx('text-center font-bold text-lg', {
					'animate-pulse': isLoading,
				})}
			>
				{isLoading || !advice ? 'Generating wisdom...' : `"${advice.advice}"`}
			</p>
		</div>
		<div class="divider font-extrabold tracking-widest">||</div>

		<button
			class="btn btn-circle btn-primary absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 focus:active:-translate-x-1/2 focus:active:translate-y-1/2 shadow-xl hover:shadow-2xl transition-all duration-300"
			onclick={fetchAdvice}
			aria-label="Generate new advice"
			disabled={isLoading}
		>
			<Dice5Icon />
		</button>
	</div>
</div>
