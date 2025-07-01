<script lang="ts">
	import { enhance } from '$app/forms';

	let { barId, barGroups = [], allGroups = [], form = null } = $props();

	let formBind: HTMLFormElement;
</script>

<form method="POST" action="?/editGroups" bind:this={formBind} use:enhance>
	{#each allGroups as group}
		<label>
			{group}
			<input
				name="groups"
				type="checkbox"
				checked={barGroups.includes(group)}
				defaultChecked={barGroups.includes(group)}
				value={group}
				onchange={() => formBind.requestSubmit()}
			/>
		</label>
	{/each}
	<input type="hidden" name="editid" value={barId} />
	<noscript><input type="submit" value="Edit Groups" /></noscript>
</form>

<form method="POST" action="?/addGroup" use:enhance>
	<input type="hidden" name="editid" value={barId} />
	<label for="addgroup">Group name</label>
	<input id="addgroup" name="addgroup" type="text" required />
	<input type="submit" value="Add Group" />
</form>
