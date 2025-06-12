<script lang="ts">
	import { now } from '$lib/shared.svelte';

	let { start = 0, end = 0 } = $props();
	let percentage = $derived(
		100 - Math.min(Math.max((100 * (now.getTime() - start)) / (end - start), 0), 100)
	);
</script>

<div class="bar">
	<div class="outerbar shadow">
		{#if percentage > 0}
			<div class="innerbar" style="width: {percentage}%"></div>
		{/if}
	</div>
	<div class="outerbar">
		{#if percentage > 0}
			<div class="innerbar" style="width: {percentage}%"></div>
		{/if}
	</div>
</div>

<style>
	:global(:root) {
		--col-deselect: rgb(223, 223, 223);
		--col-select: rgb(222, 34, 222);
		--col-select-2: rgb(253, 75, 252);
	}

	.bar {
		position: relative;
		width: 75%;
		height: 50px;
	}

	.outerbar {
		width: 100%;
		height: 100%;
		background-color: var(--col-deselect);
		position: absolute;
	}

	.innerbar {
		height: 100%;
		background-image: linear-gradient(var(--col-select-2), var(--col-select));
		/* background-color: var(--col-select); */
	}

	.shadow {
		top: 3px;
		left: 3px;
		filter: brightness(0.33);
	}
</style>
