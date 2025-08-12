<script lang="ts">
	import { goto } from '$app/navigation'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()

	let searchTerm = $state('')
	let selectedRegion = $state('All')

	console.log('Loaded countries:', data.countries)

	let filteredCountries = $derived.by(() => {
		// Filter by region first
		let result = data.countries
		if (selectedRegion !== 'All') {
			result = result.filter((country) => country.region === selectedRegion)
		}

		// Then filter by search term
		if (searchTerm) {
			result = result.filter((country) =>
				country.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
			)
		}

		return result
	})

	const regions = [
		'All',
		...new Set(data.countries.map((country) => country.region)),
	]

	function handleCountryClick(countryName: string) {
		// Use SvelteKit's navigation to move to the country detail page
		goto(`/${countryName}`)
	}
</script>

<!-- Main content wrapper -->
<div class="flex flex-col gap-6">
	<!-- Search and filter controls -->
	<div
		class="flex flex-col md:flex-row md:justify-between md:items-center gap-6"
	>
		<!-- Search Input -->
		<div class="relative w-full md:w-1/3">
			<div
				class="absolute inset-y-0 left-0 flex items-center pl-4 text-base-content/60 search-icon"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
					/>
				</svg>
			</div>
			<input
				type="text"
				placeholder="Search for a country..."
				class="input w-full pl-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
				bind:value={searchTerm}
			/>
		</div>

		<!-- Region Filter Dropdown -->
		<details
			class="dropdown w-full md:w-1/4"
			onclick={(e) => e.stopPropagation()}
		>
			<summary
				role="button"
				class="btn w-full justify-between shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
			>
				<span class="truncate">Filter by Region ({selectedRegion})</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fill-rule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clip-rule="evenodd"
					/>
				</svg>
			</summary>
			<ul
				class="dropdown-content z-[1] menu p-2 shadow-sm bg-base-100 rounded-box w-full"
			>
				{#each regions as region}
					<li>
						<a
							onclick={() => {
								selectedRegion = region
								// Close the dropdown after selection
								const detailsElement = document.querySelector('details')
								if (detailsElement) detailsElement.removeAttribute('open')
							}}
						>
							{region}
						</a>
					</li>
				{/each}
			</ul>
		</details>
	</div>

	<!-- Country Cards Grid -->
	<div
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
	>
		{#each filteredCountries as country}
			<div
				class="card bg-base-100 shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
				onclick={() => handleCountryClick(country.name.common)}
			>
				<figure class="aspect-[3/2]">
					<img
						src={country.flags.png}
						alt="Flag of {country.name.common}"
						class="object-cover w-full h-full"
					/>
				</figure>
				<div class="card-body p-6">
					<h2 class="card-title text-xl font-bold truncate">
						{country.name.common}
					</h2>
					<p class="text-sm">
						<span class="font-semibold">Population:</span>
						{country.population.toLocaleString()}
					</p>
					<p class="text-sm">
						<span class="font-semibold">Region:</span>
						{country.region}
					</p>
					<p class="text-sm truncate">
						<span class="font-semibold">Capital:</span>
						{country.capital ? country.capital.join(', ') : 'N/A'}
					</p>
				</div>
			</div>
		{:else}
			<p>No countries found.</p>
		{/each}
	</div>
</div>
