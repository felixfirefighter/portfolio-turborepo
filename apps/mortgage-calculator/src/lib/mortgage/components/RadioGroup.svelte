<script lang="ts">
	import clsx from 'clsx'

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

<div class="form-control text-sm text-neutral">
	<label>
		<p class="text-sm mb-2 font-medium">{label}</p>
		<div class="space-y-2">
			{#each options as option}
				<button
					type="button"
					class={clsx(
						'flex w-full items-center px-4 py-3 border rounded-lg cursor-pointer transition-all duration-200 ease-in-out',
						{
							'border-primary bg-primary-focus text-primary-content':
								selected === option.value,
							'border-gray-300': selected !== option.value,
							'border-error bg-error text-error-content': errorMessage,
						},
					)}
					onclick={() => (selected = option.value)}
				>
					<input
						type="radio"
						{name}
						class="radio radio-primary {errorMessage ? 'radio-error' : ''}"
						value={option.value}
						bind:group={selected}
					/>
					<span class="ml-3 text-sm font-medium">
						{option.label}
					</span>
				</button>
			{/each}
		</div>
	</label>

	<span class="text-error">{errorMessage}</span>
</div>
