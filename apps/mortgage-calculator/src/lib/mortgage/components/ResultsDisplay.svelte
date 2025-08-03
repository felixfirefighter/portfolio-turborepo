<script lang="ts">
	export let monthlyRepayments: number
	export let totalRepayable: number

	// Format numbers to currency
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})

	$: formattedMonthlyRepayments = formatter.format(monthlyRepayments)
	$: formattedTotalRepayable = formatter.format(totalRepayable)
</script>

<div class="w-full text-center lg:text-left">
	<h3 class="text-2xl font-semibold mb-4">Your results</h3>
	<p class="text-lg opacity-80 mb-8">
		Your results are shown below based on the information you provided. To adjust
		the results, edit the form and click "calculate repayments" again.
	</p>

	<div class="p-6 bg-primary-focus rounded-xl mb-4">
		<p class="text-lg opacity-80">Your monthly repayments</p>
		<p class="text-4xl font-bold text-primary-content">
			{formattedMonthlyRepayments}
		</p>
	</div>

	<div class="p-6 bg-primary-focus rounded-xl">
		<p class="text-lg opacity-80">Total you'll repay over the term</p>
		<p class="text-4xl font-bold text-primary-content">
			{formattedTotalRepayable}
		</p>
	</div>
</div>
