<svelte:options immutable={true} />

<script>
	import { MenuIcon } from '@lucide/svelte'

	// Svelte components do not use default exports
</script>

<div>
	<div class="navbar container mx-auto">
		<div class="navbar-start">
			<div class="dropdown">
				<button
					type="button"
					class="btn btn-ghost lg:hidden"
					tabindex="0"
					aria-label="Open menu"
				>
					<MenuIcon />
				</button>
				<ul
					class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
				>
					<li><a href="/">Features</a></li>
					<li><a href="/">Pricing</a></li>
					<li><a href="/">Resources</a></li>
				</ul>
			</div>
			<a class="normal-case mx-2 text-xl font-bold" href="/">Shortly</a>
			<div class="navbar-center hidden lg:flex">
				<ul class="menu menu-horizontal px-1">
					<li><a href="/">Features</a></li>
					<li><a href="/">Pricing</a></li>
					<li><a href="/">Resources</a></li>
				</ul>
			</div>
		</div>
		<div class="navbar-end gap-2">
			<a class="btn btn-ghost">Login</a>
			<a class="btn btn-primary">Sign Up</a>
		</div>
	</div>
</div>
