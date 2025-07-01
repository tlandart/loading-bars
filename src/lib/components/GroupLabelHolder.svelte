<script lang="ts">
	import GroupLabel from '$lib/components/GroupLabel.svelte';
	import type { Group } from '$lib/server/database';

	let { groups, selectedGroups = $bindable(), editable = false } = $props();

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
		// make sure only elements from groups are in selectedGroups. this shouldn't even be violated but... just to make sure.
		selectedGroups = [
			...new Set(selectedGroups).intersection(
				new Set(groups.map(({ id, name, color }: Group) => id))
			)
		];
	}
</script>

{#if editable}
	<label>
		<input type="checkbox" bind:checked={enableEdit} />
		Edit Groups
	</label>
{/if}
<div class="panel">
	{#each groups as group}
		<GroupLabel
			{group}
			selected={selectedGroups.includes(group.id)}
			enableEdit={editable && enableEdit}
			onClick={handleClick}
		/>
	{/each}
</div>

<style>
	.panel {
		display: flex;
		flex-wrap: wrap;
	}
</style>
