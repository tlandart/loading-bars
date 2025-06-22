<script lang="ts">
	import { now } from '$lib/shared.svelte';
	import { onMount } from 'svelte';

	let { start = 0, end = 0, onclick = null } = $props();
	let percentage = $derived(
		100 - Math.min(Math.max((100 * (now.getTime() - start)) / (end - start), 0), 100)
	);
</script>

<!-- Ignoring these warnings because we have an actual accessibility-friendly edit button, this one is just extra. -->
<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="bar" {onclick}>
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
		animation-duration: 0.75s;
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
		top: 4px;
		left: 4px;
		filter: brightness(0.5);
	}
</style>
