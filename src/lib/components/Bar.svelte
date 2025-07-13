<script lang="ts">
	import { now } from '$lib/shared.svelte';
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';

	const rulerMode: { on: boolean } = getContext('rulerMode');

	let { start = 0, end = 0, onclick = null } = $props();
	let percentage = $derived(
		100 - Math.min(Math.max((100 * (now.getTime() - start)) / (end - start), 0), 100)
	);

	// What percentage of the bar does 1 day take up?
	let dayPercentage = $derived(Math.max((100 * 86400000) / (end - start), 0));
	// What percentage of the bar does 1 hou take up?
	let houPercentage = $derived(Math.max((100 * 3600000) / (end - start), 0));
	// What percentage of the bar does 1 min take up?
	let minPercentage = $derived(Math.max((100 * 60000) / (end - start), 0));
	// What percentage of the bar does 1 sec take up?
	let secPercentage = $derived(Math.max((100 * 1000) / (end - start), 0));

	let percHolder = $derived([
		{ name: 'second', val: secPercentage },
		{ name: 'minute', val: minPercentage },
		{ name: 'hour', val: houPercentage },
		{ name: 'day', val: dayPercentage }
	]);
</script>

{#if rulerMode.on}
	{#each percHolder as perc}
		{#if perc.val > 1 && perc.val < 100}
			<div class="ruler" transition:fly={{ y: 200, duration: 2000 }}>
				<div class="rulerbar" style:width="{perc.val}%"></div>
				<span class="rulerbarlabel">1 {perc.name}</span>
			</div>
		{/if}
	{/each}
	<div style:margin-bottom="3px"></div>
{/if}
<!-- Ignoring these warnings because we do have an actual accessibility-friendly edit button, this one is just extra. -->
<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="bar" {onclick}>
	<div class="outerbar shadow">
		{#if percentage > 0}
			<div class="innerbar" style:width="{percentage}%"></div>
		{/if}
	</div>
	<div class="outerbar">
		{#if percentage > 0}
			<div class="innerbar" style:width="{percentage}%"></div>
		{/if}
	</div>
</div>

<style>
	@keyframes glow {
		from {
			filter: hue-rotate(0deg) brightness(100%);
			box-shadow: 0px 0px 0px var(--col-select-2);
		}
		to {
			filter: hue-rotate(33deg) brightness(125%);
			box-shadow: 0px 0px 7px var(--col-select-2);
		}
	}

	.bar {
		filter: hue-rotate(0deg);
		position: relative;
		width: 100%;
		height: 50px;
	}

	.bar:hover {
		animation-name: glow;
		animation-duration: var(--hover-time);
		animation-iteration-count: infinite;
		animation-direction: alternate;
		animation-timing-function: ease-out;
	}

	.outerbar {
		width: 100%;
		height: 100%;
		background-color: var(--col-deselect);
		position: absolute;
		border-radius: var(--radius-amount);
	}

	.innerbar {
		height: 100%;
		background-image: linear-gradient(var(--col-select-2), var(--col-select));
		/* background-color: var(--col-select); */
		border-radius: var(--radius-amount);
	}

	.shadow {
		top: 3px;
		left: 3px;
		filter: brightness(0.33);
		transition-duration: 0.3s;
	}

	.bar:hover > .shadow {
		top: 3.5px;
		left: 3.5px;
		filter: brightness(0.5);
	}

	.ruler {
		height: 18px;
		display: flex;
		opacity: 50%;
	}

	.rulerbar {
		background-color: var(--col-deselect);
		height: 30%;
		margin: auto 0px;
		border-radius: var(--radius-amount);
	}

	.rulerbarlabel {
		color: var(--col-deselect);
		font-size: 14px;
		margin-left: 3px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
