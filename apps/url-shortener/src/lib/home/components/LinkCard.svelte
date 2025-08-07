<script lang="ts">
	const { originalUrl, shortenedUrl, copied, oncopy } = $props()

	// Handle the copy-to-clipboard functionality
	function handleCopyClick() {
		try {
			const tempInput = document.createElement('textarea')
			tempInput.value = shortenedUrl
			document.body.appendChild(tempInput)
			tempInput.select()
			document.execCommand('copy')
			document.body.removeChild(tempInput)

			oncopy()
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}
</script>

<div class="card bg-base-100 shadow-md">
	<div
		class="card-body flex-col md:flex-row items-center justify-between md:gap-4 p-4 md:p-6"
	>
		<!-- Original URL -->
		<div class="flex-grow text-sm md:text-base break-all">
			{originalUrl}
		</div>

		<div
			class="divider md:divider-horizontal my-2 md:my-0 h-1 md:h-12 w-full md:w-1"
		></div>

		<!-- Shortened URL and Copy Button -->
		<div class="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
			<a
				href={shortenedUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="link link-primary link-hover text-sm md:text-base"
			>
				{shortenedUrl}
			</a>
			<button
				onclick={handleCopyClick}
				class="btn btn-primary btn-sm md:btn-md w-full md:w-auto"
			>
				{#if copied}Copied!{:else}Copy{/if}
			</button>
		</div>
	</div>
</div>
