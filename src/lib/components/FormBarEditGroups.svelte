<script lang="ts">
	import { enhance } from '$app/forms';
	import GroupLabelHolder from './GroupLabelHolder.svelte';

	let { bar, groups, form } = $props();

	let selectedGroups = $state(bar.groups);

	let formBind: HTMLFormElement;
</script>

<form method="POST" action="?/editgroupsbar" bind:this={formBind} use:enhance>
	{#each groups as group}
		<input
			name="groups"
			type="checkbox"
			value={group.id}
			checked={selectedGroups.includes(group.id)}
			defaultChecked={selectedGroups.includes(group.id)}
			onchange={() => formBind.requestSubmit()}
		/>
	{/each}
	<GroupLabelHolder {groups} bind:selectedGroups />
	<input type="hidden" name="editid" value={bar.id} />
</form>

<style>
	form {
		display: flex;
	}

	input[type='checkbox'] {
		display: none;
	}
</style>
