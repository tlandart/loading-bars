<script>
	let { children, isOpen = $bindable() } = $props();

	// based on https://svelte.dev/playground/modal
	let dialog = $state();

	$effect(() => {
		if (isOpen) dialog.showModal();
	});
</script>

<dialog
	bind:this={dialog}
	onclose={() => {
		isOpen = false;
	}}
>
	<button
		class="background"
		aria-label="Close"
		tabindex="-1"
		onclick={() => {
			dialog.close();
		}}
	></button>
	<div class="foreground">
		<button
			class="close"
			aria-label="Close"
			onclick={() => {
				dialog.close();
			}}>X</button
		>
		{@render children()}
	</div>
</dialog>

<style>
	dialog {
		margin: 0;
		padding: 0;
		border: 0;
		color: white;
	}

	dialog::backdrop {
		background: none;
	}

	.background {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: rgb(0, 0, 0, 0.33);
		z-index: 1000;
		border: none;
	}

	.foreground {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 25px;
		border: 2px solid var(--col-deselect);
		border-radius: 2px;
		background-color: black;
		z-index: 2000;
	}

	.close {
		color: var(--col-deselect);
		background-color: black;
		font-size: 20px;
		border: none;
		border-radius: 2px;
		padding: 5px 10px;
		cursor: pointer;
		position: absolute;
		right: 0;
		top: 0;
	}
</style>
