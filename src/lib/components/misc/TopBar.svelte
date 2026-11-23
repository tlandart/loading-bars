<script lang="ts">
	import { getContext } from 'svelte';

	let open = $state(false);

	const editMode: { on: boolean } = getContext('editMode');
	const rulerMode: { on: boolean } = getContext('rulerMode');
	let hoverToOpen = $state(true);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="topbar {open ? 'open' : ''}"
	onmouseenter={() => {
		if (hoverToOpen) open = true;
	}}
	onmouseleave={() => {
		if (hoverToOpen) open = false;
	}}
>
	<button onclick={() => (open = !open)}>
		{#if open}
			&#10005;
		{:else}
			&#8230;
			<!-- &#9881; -->
		{/if}
	</button>
	{#if open}
		<label>
			<span>Edit mode</span>
			<input type="checkbox" bind:checked={editMode.on} />
		</label>
		<label>
			<span>Show rulers</span>
			<input type="checkbox" bind:checked={rulerMode.on} />
		</label>
		<label>
			<span>Hover to open this menu</span>
			<input type="checkbox" bind:checked={hoverToOpen} />
		</label>
	{/if}
</div>

<style>
	.topbar {
		position: fixed;
		display: flex;
		flex-direction: column;
		top: 0;
		left: 0;
		background-color: var(--col-background);
		z-index: 5000;
		padding: 6px;
		margin: 5px;
		border-radius: var(--radius-amount);
		border: 2px solid transparent;
		transition-duration: var(--hover-time);
		user-select: none;
	}

	.topbar:hover,
	.open {
		border-color: var(--col-deselect);
		transition-duration: 0.3s;
	}

	label {
		font-size: 16px;
		margin-top: 6px;
		margin-bottom: 6px;
		margin-left: 6px;
		display: flex;
	}

	span {
		margin-right: 6px;
	}

	input[type='checkbox'] {
		margin-left: auto;
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
