<script lang="ts">
	import emptyStateSvg from '$lib/mortgage/assets/illustration-empty.svg?raw'
</script>

<div
	class="flex flex-col items-center justify-center text-center p-4 text-white"
>
	<div class="w-44 h-44 mb-6">
		{@html emptyStateSvg}
	</div>
	<h3 class="text-2xl font-semibold mb-4">Results shown here</h3>
	<p class="text-neutral-content">
		Complete the form and click "calculate repayments" to see what your monthly
		repayments would be.
	</p>
</div>
