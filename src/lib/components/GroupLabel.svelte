<script lang="ts">
	import { enhance } from '$app/forms';

	let {
		group,
		selected = false,
		enableEdit = false,
		onClick = (event: Event) => {},
		submitOnClick = false // whether the clickable grouplabel is a submit button (for if it is being used in a form, e.g. the edit bar form)
	} = $props();

	// svelte-ignore non_reactive_update
	let formBind: HTMLFormElement;
</script>

<button
	type={submitOnClick ? 'submit' : 'button'}
	onclick={(event) => {
		if (!enableEdit) onClick(event);
	}}
	value={group.id}
	class={`panel ${selected || enableEdit ? 'selected' : ''}`}
	style={`background-color: ${group.color}40;
	border-color: ${group.color}40;
	filter: contrast(${selected || enableEdit ? '1.5' : '0.33'});
	cursor: ${enableEdit ? 'default' : 'pointer'};`}
>
	{#if !enableEdit}
		<div class="colorbox" style={`background-color: ${group.color};`}></div>
		<div class="buttonlabel">{group.name}</div>
	{:else}
		<form method="POST" action="?/editgroup" bind:this={formBind} use:enhance>
			<input name="id" type="hidden" value={group.id} />
			<input
				id="groupcolor"
				name="groupcolor"
				type="color"
				defaultValue={group.color}
				value={group.color}
				onchange={() => {
					formBind.requestSubmit();
				}}
				required
			/>
			<input
				id="groupname"
				name="groupname"
				type="text"
				autocomplete="off"
				defaultValue={group.name}
				value={group.name}
				size={group.name.length}
				onchange={() => {
					formBind.requestSubmit();
				}}
				required
			/>
			<noscript><input type="submit" value="Edit" /></noscript>
		</form>
		<form method="POST" action="?/deletegroup" use:enhance>
			<input name="id" type="hidden" value={group.id} />
			<input type="submit" value="Delete" />
		</form>
	{/if}
</button>

<style>
	.panel {
		display: flex;
		padding: 4px;
		width: auto;
		font-size: 15px;
		color: var(--col-deselect);
		border: 1px solid var(--col-deselect);
		border-radius: var(--radius-amount);
		transition-duration: 0.1s;
		opacity: 66%;
	}

	.selected {
		opacity: 100%;
	}

	.colorbox {
		width: 10px;
		height: 10px;
		border: 1px solid var(--col-deselect);
		margin: 0 5px;
	}

	input[type='color'] {
		width: 25px;
		height: 25px;
		border: none;
		padding: 0;
		cursor: pointer;
		margin-right: 5px;
	}

	input[type='text'] {
		margin: 0;
	}

	.buttonlabel {
		margin-right: 5px;
	}

	button {
		align-items: center;
		margin: 3px;
	}

	form {
		display: flex;
		align-items: center;
	}

	input[type='submit']:hover {
		color: black;
		background-color: var(--col-deselect);
	}

	input[type='submit'] {
		color: var(--col-deselect);
		background-color: transparent;
		font-size: 15px;
		border: none;
		border-radius: var(--radius-amount);
		cursor: pointer;
		margin-left: 5px;
	}
</style>
