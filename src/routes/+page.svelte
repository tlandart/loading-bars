<script lang="ts">
	import BarCard from '$lib/components/BarCard.svelte';
	let { data } = $props();
</script>

{#each data.bars as bar}
	<BarCard start={bar.start} end={bar.end} name={bar.name} />
{/each}
