<script lang="ts">
	import BarCardHolder from '$lib/components/BarCardHolder.svelte';
	import PopupMenu from '$lib/components/PopupMenu.svelte';
	import UserCreateForm from '$lib/components/UserCreateForm.svelte';
	import UserDownloadForm from '$lib/components/UserDownloadForm.svelte';
	import UserUploadForm from '$lib/components/UserUploadForm.svelte';
	let { data, form } = $props();

	let createFormToggle = $state(false);

	// TODO QOL: style create form
	// TODO FEAT: edit bar menu
	// TODO FEAT: bar groups OR tags (and finished bars are in a custom group/tag thats in a menu)
	// TODO QOL: scollable inputs on relative create form
</script>

<div class="page">
	<div class="savearea">
		<div class="savearealeft">
			<UserUploadForm {form} />
		</div>
		<div class="savearearight">
			<UserDownloadForm {form} />
		</div>
	</div>
	<BarCardHolder bars={data.bars} />
	<PopupMenu bind:isOpen={createFormToggle}>
		<UserCreateForm {form} />
	</PopupMenu>
	<button
		onclick={() => {
			createFormToggle = true;
		}}>Add Bar</button
	>

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}
</div>

<style>
	:global(:root) {
		--col-deselect: rgb(223, 223, 223);
		--col-select: rgb(222, 34, 222);
		--col-select-2: rgb(253, 75, 252);
		color: white;
		background-color: black;
		font-family: 'Roboto', 'Arial', sans-serif;
	}

	.page {
		width: 75%;
		margin-top: 50px;
		margin-left: auto;
		margin-right: auto;
		padding: 25px;
		border: 2px solid var(--col-deselect);
		border-radius: 2px;
	}

	.error {
		color: red;
	}

	.savearea {
		display: flex;
		width: 100%;
		height: 24px;
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
