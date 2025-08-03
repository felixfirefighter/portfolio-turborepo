<script lang="ts">
	interface Props {
		label: string
		placeholder: string
		value: number
		error?: string | string[] | undefined
		type?: string
		unit?: 'years' | '%' | '$'
		name: string
	}

	let {
		label,
		placeholder,
		value = $bindable(),
		error,
		type = 'text',
		unit,
		name,
	}: Props = $props()

	// Reactive class for error state
	let inputClass = $derived(
		`input input-bordered w-full rounded-lg ${error ? 'input-error' : ''}`,
	)
	let errorMessage = $derived(Array.isArray(error) ? error[0] : error) // Display only the first error if it's an array
</script>

<div class="form-control w-full">
	<label class="label">
		<span class="label-text text-base font-medium text-gray-700">{label}</span>
	</label>
	<label class="input-group">
		{#if unit === '$'}
			<span class="bg-gray-200 text-gray-700 font-semibold rounded-l-lg">$</span>
		{/if}
		<input
			{type}
			{placeholder}
			class={inputClass}
			bind:value
			min={type === 'number' ? 0 : undefined}
			{name}
		/>
		{#if unit === 'years'}
			<span class="bg-gray-200 text-gray-700 font-semibold rounded-r-lg"
				>years</span
			>
		{:else if unit === '%'}
			<span class="bg-gray-200 text-gray-700 font-semibold rounded-r-lg">%</span>
		{/if}
	</label>
	{#if errorMessage}
		<label class="label">
			<span class="label-text-alt text-error">{errorMessage}</span>
		</label>
	{/if}
</div>
