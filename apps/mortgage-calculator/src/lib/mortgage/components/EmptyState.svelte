<script lang="ts">
	// SVG for the empty state illustration
	import emptyStateSvg from '$lib/mortgage/assets/illustration-empty.svg?raw'
</script>

<div class="flex flex-col items-center justify-center text-center p-4">
	<div class="w-44 h-44 mb-6" style="filter: brightness(1.2);">
		{@html emptyStateSvg}
	</div>
	<h3 class="text-2xl font-semibold mb-2">Results shown here</h3>
	<p class="text-lg opacity-80 max-w-sm">
		Complete the form and click "calculate repayments" to see what your monthly
		repayments would be.
	</p>
</div>
