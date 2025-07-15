<script lang="ts">
	import GroupLabel from '$lib/components/GroupLabel.svelte';
	import type { Group } from '$lib/server/database';
	import PopupMenu from '$lib/components/misc/PopupMenu.svelte';
	import FormGroupCreate from '$lib/components/FormGroupCreate.svelte';

	let { groups, selectedGroups = $bindable(), editable = false, submitOnClick = false } = $props();

	let createGroupFormToggle = $state(false);
	let enableEdit = $state(false);

	$effect(() => {
		// This is janky because it has to avoid infinite loops but it ensures that when a group is deleted, selectedGroups is syncronized.
		if (groups) {
			const newSelectedGroups = [
				...new Set(selectedGroups).intersection(
					new Set(groups.map(({ id, name, color }: Group) => id))
				)
			];
			if (selectedGroups.length !== newSelectedGroups.length) selectedGroups = newSelectedGroups;
		}
	});

	function handleClick(event: Event & { currentTarget: EventTarget & HTMLButtonElement }) {
		const groupId = event.currentTarget.value;
		if (!selectedGroups.includes(groupId)) {
			selectedGroups.push(groupId);
			selectedGroups.sort();
		} else {
			selectedGroups = selectedGroups.filter((id: string) => id !== groupId);
		}
	}
</script>

{#if editable}
	<label>
		<input type="checkbox" bind:checked={enableEdit} />
		Edit groups
	</label>
	{#if enableEdit}
		<PopupMenu bind:isOpen={createGroupFormToggle} header="Add group">
			{#snippet children({ dialogClose = () => {} })}
				<FormGroupCreate {dialogClose} />
			{/snippet}
		</PopupMenu>
		<button
			onclick={() => {
				createGroupFormToggle = true;
			}}
			>Add group
		</button>
	{/if}
{/if}
<div class="panel">
	{#each groups as group}
		<GroupLabel
			{group}
			selected={selectedGroups.includes(group.id)}
			enableEdit={editable && enableEdit}
			onClick={handleClick}
			{submitOnClick}
		/>
	{/each}
</div>

<style>
	.panel {
		display: flex;
		flex-wrap: wrap;
		margin: 10px 0;
	}
</style>
