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

	let errorMessage = $derived(Array.isArray(error) ? error[0] : error) // Display only the first error if it's an array
</script>

<div class="form-control text-sm text-neutral">
	<label class="label-text">
		<p class="mb-2">{label}</p>
		<label class="input input-secondary w-full">
			{#if unit === '$'}
				<span class="label">$</span>
			{/if}
			<input
				{type}
				{placeholder}
				class="w-full"
				bind:value
				min={type === 'number' ? 0 : undefined}
				{name}
			/>
			{#if unit === 'years'}
				<span class="label">years</span>
			{:else if unit === '%'}
				<span class="label">%</span>
			{/if}
		</label>
	</label>

	<span class="text-error">{errorMessage}</span>
</div>
