<script lang="ts">
	import BarCardHolder from '$lib/components/BarCardHolder.svelte';
	import PopupMenu from '$lib/components/misc/PopupMenu.svelte';
	import FormBarCreate from '$lib/components/FormBarCreate.svelte';
	import FormFileDownload from '$lib/components/FormFileDownload.svelte';
	import FormFileUpload from '$lib/components/FormFileUpload.svelte';
	import GroupLabelHolder from '$lib/components/GroupLabelHolder.svelte';
	import { setContext } from 'svelte';
	import TopBar from '$lib/components/misc/TopBar.svelte';
	let { data, form } = $props();

	let createBarFormToggle = $state(false);
	let filterGroups = $state([]);

	let editMode = $state({ on: false });
	setContext('editMode', editMode);

	let rulerMode = $state({ on: false });
	setContext('rulerMode', rulerMode);

	// let themeColor = $state('#ffffff');

	// TODO QOL: toggle for overdue bars
	// TODO FEAT: add themes (just color changes?) use useContext
	// TODO FEAT: filter bars by name or date(s) or groupnames
</script>

<TopBar />
<div class="page">
	{#if editMode.on}
		<!-- <input
			type="color"
			defaultValue={themeColor}
			onchange={(e) => (themeColor = e.currentTarget.value)}
		/> -->
		<div class="savearea">
			<div class="savearealeft">
				<FormFileUpload {form} />
			</div>
			<div class="savearearight">
				<FormFileDownload {form} />
			</div>
		</div>
		<GroupLabelHolder groups={data.groups} bind:selectedGroups={filterGroups} editable />
	{/if}
	<BarCardHolder bars={data.bars} groups={data.groups} {filterGroups} />
	{#if editMode.on}
		<PopupMenu bind:isOpen={createBarFormToggle} header="Add bar" {form}>
			{#snippet children({ dialogClose = () => {} })}
				<FormBarCreate {form} {dialogClose} groups={data.groups} />
			{/snippet}
		</PopupMenu>
		<button
			onclick={() => {
				createBarFormToggle = true;
			}}
			>Add bar
		</button>
	{/if}
</div>

<style>
	:global(:root) {
		/* --col-background: rgb(54, 68, 40); */
		--col-background: #0f0f0f;
		--col-deselect: rgb(223, 223, 223);
		--col-select: rgb(78, 78, 78);
		--col-select-2: rgb(139, 139, 139);
		/* --col-select: rgb(180, 27, 180);
		--col-select-2: rgb(224, 67, 224); */
		/* --col-select: rgb(167, 133, 25);
		--col-select-2: rgb(206, 172, 60); */
		--radius-amount: 2.5px;
		--hover-time: 0.5s;
		color: white;
		background-color: var(--col-background);
	}

	:global(*) {
		font-family: 'Roboto', 'Arial', sans-serif;
	}

	:global(*::selection) {
		color: white;
		background-color: #575757;
	}

	:global(.error) {
		color: red;
	}

	.page {
		width: 60%;
		margin: 50px auto;
		padding: 25px;
		border: 2px solid var(--col-deselect);
		border-radius: var(--radius-amount);
	}

	@media (max-width: 1000px) {
		.page {
			width: 80%;
		}
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
