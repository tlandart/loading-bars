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
	button {
		color: var(--col-deselect);
		background-color: black;
		font-size: 15px;
		border: none;
		border-radius: 2px;
		padding: 5px 10px;
		cursor: pointer;
	}
	.confirm {
		color: black;
		background-color: var(--col-deselect);
	}
</style>
