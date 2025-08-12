<script lang="ts">
	import { goto } from '$app/navigation'
	import type { PageProps } from './$types'
	import { ChevronDown, SearchIcon } from '@lucide/svelte'

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
		<label class="input">
			<SearchIcon size="16" />
			<input
				type="text"
				class="grow"
				placeholder="Search for a country..."
				bind:value={searchTerm}
			/>
		</label>

		<!-- Region Filter Dropdown -->
		<details class="dropdown w-full md:w-1/4">
			<summary
				class="btn w-full justify-between shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
			>
				<span class="truncate">Filter by Region ({selectedRegion})</span>
				<ChevronDown size="16" />
			</summary>
			<ul
				class="dropdown-content z-[1] menu p-2 shadow-sm bg-base-100 rounded-box w-full"
			>
				{#each regions as region}
					<li>
						<button
							onclick={() => {
								selectedRegion = region
								const detailsElement = document.querySelector('details')
								if (detailsElement) detailsElement.removeAttribute('open')
							}}
						>
							{region}
						</button>
					</li>
				{/each}
			</ul>
		</details>
	</div>

	<!-- Country Cards Grid -->
	<div
		class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 lg:gap-12"
	>
		{#each filteredCountries as country}
			<button
				class="rounded bg-base-100 shadow-md overflow-hidden text-start cursor-pointer hover:shadow-xl transition-shadow"
				onclick={() => handleCountryClick(country.name.common)}
			>
				<figure class="aspect-[3/2] border-b border-base-300">
					<img
						src={country.flags.png}
						alt="Flag of {country.name.common}"
						class="object-cover w-full h-full"
					/>
				</figure>
				<div class="card-body p-4 px-6 mb-2">
					<h2 class="card-title text-xl font-bold truncate">
						{country.name.common}
					</h2>
					<p>
						<span class="font-semibold">Population:</span>
						{country.population.toLocaleString()}
					</p>
					<p>
						<span class="font-semibold">Region:</span>
						{country.region}
					</p>
					<p class="truncate">
						<span class="font-semibold">Capital:</span>
						{country.capital ? country.capital.join(', ') : 'N/A'}
					</p>
				</div>
			</button>
		{:else}
			<p>No countries found.</p>
		{/each}
	</div>
</div>
