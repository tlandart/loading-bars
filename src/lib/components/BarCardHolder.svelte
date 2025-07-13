<script lang="ts">
	// Holds all the bar cards, and handles rendering of groups. Also has the timer system for how often to update the SvelteDate.

	import BarCard from '$lib/components/BarCard.svelte';
	import { now } from '$lib/shared.svelte';
	import { getContext, onMount } from 'svelte';
	import DragHandler from './misc/DragHandler.svelte';
	import { flip } from 'svelte/animate';
	import { enhance } from '$app/forms';
	let { bars, groups, filterGroups = [] } = $props();

	const editMode: { on: boolean } = getContext('editMode');

	// svelte-ignore non_reactive_update
	let formBind: HTMLFormElement;

	let dragging = $state(false);
	// The ID of the bar that is currently being dragged over, or null.
	let dragOverId: string | null = $state(null);
	// The ID of the bar that is currently being dragged, or null.
	let selectedId: string | null = $state(null);

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

	function checkFilter(barGroups: any[], filterGroups: any[]) {
		if (filterGroups.length <= 0) return true;
		else if (barGroups.length > 0)
			return new Set(barGroups).intersection(new Set(filterGroups)).size > 0;
	}
</script>

{#if editMode.on}
	<form method="POST" action="?/movebar" bind:this={formBind} use:enhance>
		<input type="hidden" name="id1" value={selectedId} />
		<input type="hidden" name="id2" value={dragOverId} />
	</form>
{/if}
{#each bars.filter((bar: any) => checkFilter(bar.groups, filterGroups)) as bar (bar.id)}
	<!-- {#if now.getTime() < bar.end} -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="panelholder"
		ondragover={(e) => {
			// These functions are loosely based on this: https://stackoverflow.com/a/28962290
			e.currentTarget.style.filter = 'opacity(50%)';
			dragOverId = bar.id;
		}}
		ondragleave={(e) => {
			e.currentTarget.style.filter = '';
		}}
		ondragstart={(e) => {
			dragging = true;
			selectedId = bar.id;
		}}
		ondragend={(e) => {
			dragging = false;
			if (selectedId && dragOverId && selectedId !== dragOverId) {
				formBind.requestSubmit();
			}
			dragOverId = null;
			selectedId = null;
		}}
		animate:flip={{ duration: 100 }}
	>
		{#if editMode.on}
			<DragHandler />
		{/if}
		<BarCard {bar} {groups} />
	</div>
{/each}

<style>
	.panelholder {
		display: flex;
		width: 100%;
	}
</style>
