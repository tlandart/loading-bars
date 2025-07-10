<script lang="ts">
	import { getContext } from 'svelte';

	let open = $state(false);

	const presentMode: { on: boolean } = getContext('presentMode');
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="topbar {open ? 'open' : ''}"
	onmouseenter={() => (open = true)}
	onmouseleave={() => (open = false)}
>
	{#if open}
		<label>
			Present mode
			<input type="checkbox" bind:checked={presentMode.on} />
		</label>
	{/if}
	<button onclick={() => (open = !open)}>
		{#if open}
			&#10005
		{:else}
			&#8230
		{/if}
	</button>
</div>

<style>
	.topbar {
		position: fixed;
		display: flex;
		top: 0;
		left: 0;
		background-color: var(--col-background);
		z-index: 5000;
		padding: 6px;
		margin: 5px;
		border-radius: var(--radius-amount);
		border: 2px solid transparent;
		transition-duration: var(--hover-time);
	}

	.topbar:hover,
	.open {
		border-color: var(--col-deselect);
		transition-duration: 0.3s;
	}

	label {
		font-size: 16px;
		margin: auto;
	}

	button {
		user-select: none;
		cursor: pointer;
		font-size: 20px;
		border: none;
		color: white;
		background-color: transparent;
		width: 27px;
		height: 27px;
		padding-bottom: 5px;
	}
</style>
