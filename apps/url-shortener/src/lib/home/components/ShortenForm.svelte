<script lang="ts">
	let urlInput = $state('')
	let errorMessage = $state('')
	const { onshorten } = $props()

	async function handleSubmit() {
		// Clear previous error message
		errorMessage = ''

		// Validate the input
		if (!urlInput.trim()) {
			errorMessage = 'Please add a link'
			return
		}

		// Call the parent function to handle the shortening
		const result = await onshorten(urlInput)

		if (result && result.success) {
			urlInput = ''
		} else if (result && result.message) {
			errorMessage = result.message
		}
	}
</script>

<div class="flex justify-center -mt-20">
	<form
		onsubmit={handleSubmit}
		class="bg-gray-800 p-8 md:p-12 rounded-lg shadow-xl w-full max-w-4xl"
	>
		<div class="flex flex-col md:flex-row items-center gap-4">
			<div class="flex-grow w-full">
				<label class="floating-label">
					<input
						type="text"
						bind:value={urlInput}
						class="input input-lg w-full rounded"
						placeholder="Shorten a link here..."
						aria-invalid={!!errorMessage}
						aria-describedby="url-error"
					/>
					<span>Shorten a link here...</span>
				</label>
			</div>
			<button
				type="submit"
				class="btn btn-primary rounded-lg btn-lg w-full md:w-auto"
			>
				Shorten It!
			</button>
		</div>
		{#if errorMessage}
			<p id="url-error" class="text-error mt-2">{errorMessage}</p>
		{/if}
	</form>
</div>
