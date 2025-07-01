<script lang="ts">
	import { enhance } from '$app/forms';

	let { form, dialogClose = () => {} } = $props();
</script>

<form method="POST" action="?/creategroup" onsubmit={() => dialogClose()} use:enhance>
	<label for="groupname">Name</label>
	<!-- svelte-ignore a11y_autofocus -->
	<input id="groupname" name="groupname" type="text" autocomplete="off" required autofocus />
	<label for="groupcolor">Color</label>
	<input
		id="groupcolor"
		name="groupcolor"
		type="color"
		defaultValue="#ff0000"
		value="#ff0000"
		required
	/>
	<input type="submit" value="Create Group" />
</form>
