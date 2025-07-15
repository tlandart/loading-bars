<script lang="ts">
	const { innerText = 'Click Twice', confirmText = 'Are you sure?', onEnd = () => {} } = $props();
	let confirmStage = $state(true);

	const onclick = () => {
		if (confirmStage) {
			confirmStage = false;
		} else {
			onEnd();
			confirmStage = true;
		}
	};

	const reset = () => (confirmStage = true);
</script>

<button
	type="button"
	{onclick}
	onfocusout={reset}
	onmouseleave={reset}
	class={confirmStage ? '' : 'confirm'}
>
	{#if confirmStage}
		{innerText}
	{:else}
		{confirmText}
	{/if}
</button>

<style>
	.confirm {
		color: var(--col-background);
		background-color: var(--col-deselect);
	}

	button {
		color: var(--col-deselect);
		background-color: transparent;
		font-size: 15px;
		border: none;
		border-radius: var(--radius-amount);
		padding: 5px 10px;
		cursor: pointer;
		user-select: none;
	}
</style>
