<script lang="ts">
	import BarCardHolder from '$lib/components/BarCardHolder.svelte';
	import PopupMenu from '$lib/components/misc/PopupMenu.svelte';
	import FormBarCreate from '$lib/components/FormBarCreate.svelte';
	import FormFileDownload from '$lib/components/FormFileDownload.svelte';
	import FormFileUpload from '$lib/components/FormFileUpload.svelte';
	let { data, form } = $props();

	let createFormToggle = $state(false);

	// TODO QOL: style forms
	// TODO FEAT: bar groups OR tags (and finished bars are in a custom group/tag thats in a menu)
	// TODO FEAT: groups editor, where you can assign colours to groups and delete them (can't add because that has to be in the edit menu. this could also be changed. but itll take a while)
	// TODO FEAT: button to hide all other buttons and disable click-to-edit on bars, so the ui is clean (just the bars, timers, and names). use useContext for on/off state
	// TODO FEAT: add themes (just color changes?) use useContext
	// TODO FEAT: filter bars by name or date(s) or groupnames
</script>

<div class="page">
	<div class="savearea">
		<div class="savearealeft">
			<FormFileUpload {form} />
		</div>
		<div class="savearearight">
			<FormFileDownload {form} />
		</div>
	</div>
	<BarCardHolder bars={data.bars} />
	<PopupMenu bind:isOpen={createFormToggle} header="Add Bar" {form}>
		{#snippet children({ dialogClose = () => {} })}
			<FormBarCreate {form} {dialogClose} />
		{/snippet}
	</PopupMenu>
	<button
		onclick={() => {
			createFormToggle = true;
		}}>Add Bar</button
	>
</div>

<style>
	:global(:root) {
		--col-background: rgb(54, 68, 40);
		--col-deselect: rgb(223, 223, 223);
		/* --col-select: rgb(180, 27, 180);
		--col-select-2: rgb(224, 67, 224); */
		--col-select: rgb(167, 133, 25);
		--col-select-2: rgb(206, 172, 60);
		--radius-amount: 2px;
		color: white;
		background-color: var(--col-background);
		font-family: 'Roboto', 'Arial', sans-serif;
	}

	:global(.error) {
		color: red;
	}

	.page {
		width: 75%;
		margin-top: 50px;
		margin-left: auto;
		margin-right: auto;
		padding: 25px;
		border: 2px solid var(--col-deselect);
		border-radius: var(--radius-amount);
	}

	.savearea {
		display: flex;
		margin: 5px 0px;
	}

	@media (max-width: 650px) {
		.savearea {
			flex-direction: column;
			height: auto;
		}
	}

	.savearealeft {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: clip;
	}

	.savearearight {
		margin-left: auto;
		min-width: 188px;
	}
</style>
