<script lang="ts">
	import iconBrandRecognition from '$lib/home/assets/icon-brand-recognition.svg?raw'
	import iconDetailedRecords from '$lib/home/assets/icon-detailed-records.svg?raw'
	import iconFullyCustomizable from '$lib/home/assets/icon-fully-customizable.svg?raw'

	const items = [
		{
			title: 'Brand Recognition',
			description:
				'Boost your brand recognition with each click. Generic links don’t mean a thing. Branded links help instill confidence in your content.',
			icon: iconBrandRecognition,
		},
		{
			title: 'Detailed Records',
			description:
				'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.',
			icon: iconDetailedRecords,
		},
		{
			title: 'Fully Customizable',
			description:
				'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.',
			icon: iconFullyCustomizable,
		},
	]
</script>

<div class="flex flex-col items-center md:mt-20 mx-4">
	<h2 class="text-4xl font-bold mb-4">Advanced Statistics</h2>
	<p class="max-w-lg text-center text-gray-500">
		Track how your links are performing across the web with our advanced
		statistics dashboard.
	</p>

	<div class="flex md:flex-row md:mx-0 flex-col gap-20 md:gap-8 pt-24">
		{#each items as item}
			<div class="card bg-base-100 shadow-xl p-8">
				<div
					class="bg-neutral absolute top-0 -translate-y-1/2 p-5 rounded-full w-fit"
				>
					{@html item.icon}
				</div>
				<h3 class="text-xl font-bold pt-8 mb-2">{item.title}</h3>
				<p class="text-gray-500">{item.description}</p>
			</div>
		{/each}
	</div>
</div>
