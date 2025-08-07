<svelte:options immutable={true} />

<div class="bg-gray-900 text-neutral-content py-16">
	<footer class="footer container mx-auto px-4 md:px-8">
		<div class="flex flex-col lg:flex-row lg:justify-between w-full">
			<div class="lg:w-1/4">
				<a class="text-2xl font-bold">Shortly</a>
			</div>
			<div class="flex flex-col md:flex-row flex-grow justify-around mt-8 lg:mt-0">
				<!-- Features Column -->
				<nav class="flex flex-col space-y-2 mt-4 md:mt-0">
					<header class="footer-title">Features</header>
					<a class="link link-hover">Link Shortening</a>
					<a class="link link-hover">Branded Links</a>
					<a class="link link-hover">Analytics</a>
				</nav>
				<!-- Resources Column -->
				<nav class="flex flex-col space-y-2 mt-4 md:mt-0">
					<header class="footer-title">Resources</header>
					<a class="link link-hover">Blog</a>
					<a class="link link-hover">Developers</a>
					<a class="link link-hover">Support</a>
				</nav>
				<!-- Company Column -->
				<nav class="flex flex-col space-y-2 mt-4 md:mt-0">
					<header class="footer-title">Company</header>
					<a class="link link-hover">About</a>
					<a class="link link-hover">Our Team</a>
					<a class="link link-hover">Careers</a>
					<a class="link link-hover">Contact</a>
				</nav>
			</div>
			<div
				class="grid-flow-col gap-4 md:place-self-center md:justify-self-end mt-8 lg:mt-0"
			>
				<a class="text-2xl"><i class="fab fa-facebook"></i></a>
				<a class="text-2xl"><i class="fab fa-twitter"></i></a>
				<a class="text-2xl"><i class="fab fa-pinterest"></i></a>
				<a class="text-2xl"><i class="fab fa-instagram"></i></a>
			</div>
		</div>
	</footer>
</div>
