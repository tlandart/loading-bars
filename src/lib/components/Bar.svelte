<script lang="ts">
	import { now } from '$lib/shared.svelte';
	import { onMount } from 'svelte';

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
	.bar {
		position: relative;
		width: 100%;
		height: 50px;
	}

	.outerbar {
		width: 100%;
		height: 100%;
		background-color: var(--col-deselect);
		position: absolute;
		border-radius: 2px;
	}

	.innerbar {
		height: 100%;
		background-image: linear-gradient(var(--col-select-2), var(--col-select));
		/* background-color: var(--col-select); */
		border-radius: 2px;
	}

	.shadow {
		top: 3px;
		left: 3px;
		filter: brightness(0.33);
	}
</style>
