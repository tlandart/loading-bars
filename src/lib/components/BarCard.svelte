<script lang="ts">
	import { enhance } from '$app/forms';
	import Bar from '$lib/components/Bar.svelte';
	import { now } from '$lib/shared.svelte';
	import ButtonConfirm from '$lib/components/misc/ButtonConfirm.svelte';
	import PopupMenu from '$lib/components/misc/PopupMenu.svelte';
	import FormBarEdit from '$lib/components/FormBarEdit.svelte';
	import FormBarEditGroups from './FormBarEditGroups.svelte';
	import { getContext } from 'svelte';

	let { bar, groups, form = null } = $props();
	let timeLeft = $state(0);
	// let formatType = $state(0);
	let editFormToggle = $state(false);

	const editMode: { on: boolean } = getContext('editMode');

	// svelte-ignore non_reactive_update
	let formBind: HTMLFormElement;

	$effect(() => {
		timeLeft = Math.min(bar.end - now.getTime(), bar.end - bar.start);
		// TODO make another timer that counts down to when this bar will start
	});

	/* Adapted from https://gist.github.com/flangofas/714f401b63a1c3d84aaa */
	const format = (ms: number) => {
		let sec = Math.floor(ms / 1000);
		let min = Math.floor(sec / 60);
		let hou = Math.floor(min / 60);
		let day = Math.floor(hou / 24);
		sec = parseInt((parseInt(sec.toString()) % 60).toString());
		min = parseInt((parseInt(min.toString()) % 60).toString());
		hou = parseInt((parseInt(hou.toString()) % 24).toString());
		return { day, hou, min, sec };
	};

	const formatTimestamp = (ms: number) => {
		const r = format(ms);
		const f = (s: number) => (s < 10 ? '0' + s : s);
		return `${f(r.day)}:${f(r.hou)}:${f(r.min)}:${f(r.sec)}`;
	};

	// const formatWords = (ms: number) => {
	// 	const r = format(ms);
	// 	return `${r.day} days, ${r.hou} hours, ${r.min} minutes, ${r.sec} seconds`;
	// };

	// const cycleFormatType = () => {
	// 	formatType++;
	// 	if (formatType > 1) formatType = 0;
	// };
</script>

<PopupMenu bind:isOpen={editFormToggle} header="Edit bar" {form}>
	<!-- This took me a while to figure out. Using snippets, we pass dialogClose(), as defined in PopupMenu, into its child, in this case FormBarEdit. Then we can call it from anywhere in the child, in this case once the form in it submits. -->
	{#snippet children({ dialogClose = () => {} })}
		<FormBarEdit {bar} {form} {dialogClose} />
		<FormBarEditGroups {bar} {groups} {form} />
	{/snippet}
</PopupMenu>

<div class="panel {editMode.on ? '' : 'present'}">
	<Bar
		start={bar.start}
		end={bar.end}
		onclick={() => {
			if (editMode.on) editFormToggle = true;
		}}
	/>
	<div class="panelbottom">
		<div class="panelbottomleft {editMode.on ? '' : 'present'}">
			{#if timeLeft >= 0}
				<span class="timestamp">{formatTimestamp(timeLeft)}</span>
			{:else}
				<span class="timestamp">-{formatTimestamp(-timeLeft)}</span>
			{/if}
			<span class="title">{bar.name}</span>
		</div>
		{#if editMode.on}
			<div class="panelbottomright">
				<button
					onclick={() => {
						editFormToggle = true;
					}}
					>Edit
				</button>
				<form method="POST" action="?/deletebar" bind:this={formBind} use:enhance>
					<input name="id" type="hidden" value={bar.id} />
					<ButtonConfirm
						innerText="Delete&nbsp&nbsp"
						confirmText="Delete?"
						onEnd={() => {
							formBind.requestSubmit();
						}}
					/>
				</form>
			</div>
		{/if}
	</div>
</div>

<style>
	.panel {
		margin: 10px 0px;
		width: 95%;
	}

	.panelbottom {
		display: flex;
		margin-top: 3px;
	}

	.panelbottomleft {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.panelbottomright {
		display: flex;
		width: fit-content;
		margin-left: auto;
		margin-top: auto;
	}

	.timestamp {
		font-size: 22px;
		color: white;
		background-color: transparent;
		padding: 0px 10px;
		padding-right: 5px;
		border: none;
	}

	.title {
		font-size: 17px;
		color: var(--col-deselect);
	}

	.present {
		width: 100%;
	}

	.present > .title {
		float: right;
		font-size: 20px;
		height: 100%;
		justify-items: center;
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
