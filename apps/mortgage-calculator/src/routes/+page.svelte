<script lang="ts">
	import EmptyState from '$lib/mortgage/components/EmptyState.svelte'
	import InputGroup from '$lib/mortgage/components/InputGroup.svelte'
	import RadioGroup from '$lib/mortgage/components/RadioGroup.svelte'
	import ResultsDisplay from '$lib/mortgage/components/ResultsDisplay.svelte'
	import { Calculator } from '@lucide/svelte'
	import { superForm } from 'sveltekit-superforms'

	// Initialize superForm
	const { data, form } = $props()
	const {
		form: formData,
		errors,
		enhance,
		reset,
	} = superForm(data.form, {
		resetForm: false,
	})

	// Function to clear all form fields and results
	const clearAll = () => {
		reset()
	}
</script>

<div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
	<div
		class="card lg:card-side bg-base-100 shadow-xl rounded-2xl w-full max-w-5xl"
	>
		<!-- Form Section -->
		<form method="POST" use:enhance class="card-body p-8 lg:w-1/2">
			<div class="flex justify-between items-center mb-4">
				<h2 class="card-title text-xl font-semibold">Mortgage Calculator</h2>
				<button
					type="button"
					class="btn btn-link text-sm text-secondary hover:underline"
					onclick={clearAll}
				>
					Clear All
				</button>
			</div>

			<div class="space-y-6">
				<InputGroup
					label="Mortgage Amount"
					placeholder="0"
					unit="$"
					bind:value={$formData.mortgageAmount}
					error={$errors.mortgageAmount}
					name="mortgageAmount"
				/>

				<div class="grid grid-cols-2 gap-4">
					<InputGroup
						label="Mortgage Term"
						placeholder="0"
						unit="years"
						bind:value={$formData.mortgageTerm}
						error={$errors.mortgageTerm}
						name="mortgageTerm"
					/>

					<InputGroup
						label="Interest Rate"
						placeholder="0"
						unit="%"
						bind:value={$formData.interestRate}
						error={$errors.interestRate}
						type="number"
						name="interestRate"
					/>
				</div>

				<RadioGroup
					label="Mortgage Type"
					options={[
						{ value: 'repayment', label: 'Repayment' },
						{ value: 'interest-only', label: 'Interest Only' },
					]}
					bind:selected={$formData.mortgageType}
					error={$errors.mortgageType}
					name="mortgageType"
				/>

				<button type="submit" class="btn btn-secondary rounded-full px-10">
					<Calculator size={20} />
					Calculate Repayments
				</button>
			</div>
		</form>

		<!-- Results/Empty State Section -->
		<div
			class="lg:w-1/2 bg-secondary-content/90 lg:rounded-bl-[3rem] p-8 flex items-center lg:rounded-r-2xl rounded-b-2xl"
		>
			{#if form?.result?.showResults && form?.result?.monthlyRepayments !== null && form?.result?.totalRepayable !== null}
				<ResultsDisplay
					monthlyRepayments={form?.result?.monthlyRepayments}
					totalRepayable={form?.result?.totalRepayable}
				/>
			{:else}
				<EmptyState />
			{/if}
		</div>
	</div>
</div>
