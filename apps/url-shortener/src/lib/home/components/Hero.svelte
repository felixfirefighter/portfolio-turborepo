<script>
	import heroSvg from '$lib/home/assets/illustration-working.png'
</script>

<div class="bg-base-100">
	<div class="hero container mx-auto px-4 sm:px-6 lg:px-8 py-24">
		<div
			class="hero-content flex-col lg:flex-row items-center justify-between gap-12"
		>
			<!-- Hero text content -->
			<div class="flex-2 text-center lg:text-left">
				<h1 class="text-4xl lg:text-6xl font-bold max-w-lg leading-tight">
					More than just shorter links
				</h1>
				<p class="py-6 text-neutral">
					Build your brand's recognition and get detailed insights on how your links
					are performing.
				</p>
				<button class="btn btn-primary rounded-full">Get Started</button>
			</div>

			<!-- Hero image -->
			<div class="flex-3 -mr-50">
				<img src={heroSvg} alt="Hero" />
			</div>
		</div>
	</div>
</div>
