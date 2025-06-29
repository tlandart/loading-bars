<script lang="ts">
	// Holds all the bar cards, and handles rendering of groups. Also has the timer system for how often to update the SvelteDate.

	import BarCard from '$lib/components/BarCard.svelte';
	import { now } from '$lib/shared.svelte';
	import { onMount } from 'svelte';
	let { bars } = $props();

	// how many ms between updates. don't make too small else lag
	// 1000 = 1fps, 200 = 5fps, 33 = ~30fps, 17 = ~60fps
	const UPDATE_FREQ = 1000;

	onMount(() => {
		let last_time = performance.now();
		let elapsed = 0;
		let frame = requestAnimationFrame(function update(time) {
			frame = requestAnimationFrame(update);
			elapsed += time - last_time;
			// every time UPDATE_FREQ ms passes, update the reactive date
			if (elapsed > UPDATE_FREQ) {
				now.setTime(Date.now());
				elapsed %= UPDATE_FREQ;
			}
			last_time = time;
		});

		return () => {
			cancelAnimationFrame(frame);
		};
	});

	function getAllGroups(): any {
		let groups: Set<string> = new Set();
		for (let bar of bars) groups = groups.union(new Set(bar.groups));
		return [...groups].sort();
	}
</script>

{#each bars as bar}
	{#if now.getTime() < bar.end}
		<BarCard
			id={bar.id}
			start={bar.start}
			end={bar.end}
			name={bar.name}
			groups={bar.groups}
			allGroups={getAllGroups()}
		/>
	{/if}
{/each}
