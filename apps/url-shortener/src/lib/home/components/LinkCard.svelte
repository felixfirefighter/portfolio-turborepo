<script lang="ts">
	import clsx from 'clsx'
	import { set } from 'zod'

	const { originalUrl, shortenedUrl, oncopy } = $props()

	let copied = $state(false)

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
			copied = true

			setTimeout(() => {
				copied = false
			}, 2000)
		} catch (err) {
			console.error('Failed to copy text: ', err)
		}
	}
</script>

<div class="card rounded-md bg-base-100 shadow text-base">
	<div class="card-body px-4 py-3 flex-col md:flex-row md:items-center">
		<!-- Original URL -->
		<div class="flex-grow break-all">
			{originalUrl}
		</div>

		<div class="divider my-0 h-1"></div>

		<!-- Shortened URL and Copy Button -->
		<div class="flex flex-col md:flex-row md:items-center gap-4 w-full md:w-auto">
			<a
				href={shortenedUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="link link-primary link-hover"
			>
				{shortenedUrl}
			</a>
			<button
				onclick={handleCopyClick}
				class={clsx('btn btn-sm rounded', {
					'btn-neutral': copied,
					'btn-primary': !copied,
				})}
				disabled={copied}
			>
				{#if copied}
					Copied!
				{:else}
					Copy
				{/if}
			</button>
		</div>
	</div>
</div>
