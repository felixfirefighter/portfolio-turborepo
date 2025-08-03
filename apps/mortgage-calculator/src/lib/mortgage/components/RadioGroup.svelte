<script lang="ts">
	interface Props {
		label: string
		options: { value: string; label: string }[]
		selected: string
		error?: string | string[] | undefined
		name: string
	}

	let { label, options, selected = $bindable(), error, name }: Props = $props()

	let errorMessage = $derived(Array.isArray(error) ? error[0] : error)
</script>

<div class="form-control w-full">
	<label class="label">
		<span class="label-text text-base font-medium text-gray-700">{label}</span>
	</label>
	<div class="space-y-2">
		{#each options as option}
			<div
				class="flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out
        {selected === option.value
					? 'border-primary bg-primary-focus text-primary-content'
					: 'border-gray-300 bg-white hover:bg-gray-50'}"
				on:click={() => (selected = option.value)}
			>
				<input
					type="radio"
					{name}
					class="radio radio-primary {errorMessage ? 'radio-error' : ''}"
					value={option.value}
					bind:group={selected}
				/>
				<span
					class="ml-3 text-base font-medium {selected === option.value
						? 'text-primary-content'
						: 'text-gray-700'}"
				>
					{option.label}
				</span>
			</div>
		{/each}
	</div>
	{#if errorMessage}
		<label class="label">
			<span class="label-text-alt text-error">{errorMessage}</span>
		</label>
	{/if}
</div>
