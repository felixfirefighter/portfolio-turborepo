<script lang="ts">
	import { goto } from '$app/navigation'
	import type { PageProps } from './$types'

	let { data }: PageProps = $props()

	function handleBackClick() {
		// Go back to the previous page in the browser history
		history.back()
	}

	function handleBorderCountryClick(borderName: string) {
		// Navigate to the border country's detail page
		goto(`/${borderName}`)
	}
</script>

<div class="container mx-auto p-4 md:p-8">
	<button
		class="btn btn-ghost normal-case text-lg font-normal mb-8 shadow-sm hover:shadow-md"
		onclick={handleBackClick}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-5 w-5"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 19l-7-7m0 0l7-7m-7 7h18"
			/>
		</svg>
		Back
	</button>

	{#if data.country}
		<div class="flex flex-col lg:flex-row items-center lg:items-start gap-12">
			<!-- Flag Section -->
			<div class="w-full lg:w-1/2 flex-shrink-0">
				<figure class="w-full aspect-[3/2] overflow-hidden rounded-lg shadow-lg">
					<img
						src={data.country.flags.svg}
						alt="Flag of {data.country.name.common}"
						class="object-cover w-full h-full"
						onerror="this.onerror=null;this.src='https://placehold.co/600x400/cccccc/333333?text=Flag+Not+Found';"
					/>
				</figure>
			</div>

			<!-- Details Section -->
			<div class="w-full lg:w-1/2">
				<h1 class="text-4xl font-bold mb-6">{data.country.name.common}</h1>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
					<div>
						<p class="text-sm">
							<span class="font-semibold">Native Name:</span>
							{Object.values(data.country.name.nativeName)?.[0]?.common || 'N/A'}
						</p>
						<p class="text-sm">
							<span class="font-semibold">Population:</span>
							{data.country.population.toLocaleString()}
						</p>
						<p class="text-sm">
							<span class="font-semibold">Region:</span>
							{data.country.region}
						</p>
						<p class="text-sm">
							<span class="font-semibold">Sub Region:</span>
							{data.country.subregion || 'N/A'}
						</p>
						<p class="text-sm">
							<span class="font-semibold">Capital:</span>
							{data.country.capital ? data.country.capital.join(', ') : 'N/A'}
						</p>
					</div>
					<div>
						<p class="text-sm">
							<span class="font-semibold">Top Level Domain:</span>
							{data.country.tld ? data.country.tld.join(', ') : 'N/A'}
						</p>
						<p class="text-sm">
							<span class="font-semibold">Currencies:</span>
							{Object.values(data.country.currencies || {})?.[0]?.name || 'N/A'}
						</p>
						<p class="text-sm">
							<span class="font-semibold">Languages:</span>
							{Object.values(data.country.languages || {}).join(', ') || 'N/A'}
						</p>
					</div>
				</div>

				<!-- Border Countries Section -->
				<div class="flex flex-col md:flex-row items-start md:items-center gap-4">
					<span class="font-semibold whitespace-nowrap">Border Countries:</span>
					<div class="flex flex-wrap gap-2">
						{#if data.borderCountries.length > 0}
							{#each data.borderCountries as borderCountry}
								<button
									class="btn btn-sm btn-ghost normal-case shadow-sm"
									onclick={() => handleBorderCountryClick(borderCountry.name)}
								>
									{borderCountry.name}
								</button>
							{/each}
						{:else}
							<span class="text-sm">No border countries</span>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="text-center p-10">
			<h1 class="text-3xl font-bold">Country not found.</h1>
			<p class="text-lg">Please check the URL or go back to the homepage.</p>
		</div>
	{/if}
</div>
