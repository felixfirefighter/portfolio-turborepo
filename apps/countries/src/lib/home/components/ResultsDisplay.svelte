<script lang="ts">
	const { monthlyRepayments, totalRepayable } = $props()

	// Format numbers to currency
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})

	const formattedMonthlyRepayments = $derived(
		formatter.format(monthlyRepayments),
	)
	const formattedTotalRepayable = $derived(formatter.format(totalRepayable))
</script>

<div class="text-neutral-content">
	<h3 class="text-2xl font-semibold mb-4 text-white">Your results</h3>
	<p class="mb-8 text-neutral-content">
		Your results are shown below based on the information you provided. To adjust
		the results, edit the form and click "calculate repayments" again.
	</p>

	<div class="p-6 bg-primary-content rounded-xl border-t-4 border-t-secondary">
		<p class="mb-3">Your monthly repayments</p>
		<p class="text-5xl font-semibold text-secondary">
			{formattedMonthlyRepayments}
		</p>

		<div class="divider py-2 divider-neutral"></div>

		<p class="mb-2">Total you'll repay over the term</p>
		<p class="text-2xl font-bold text-white">
			{formattedTotalRepayable}
		</p>
	</div>
</div>
