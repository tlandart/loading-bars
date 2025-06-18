<script lang="ts">
	import { enhance } from '$app/forms';
	let button: HTMLInputElement;
</script>

<form method="POST" action="?/upload" enctype="multipart/form-data" use:enhance>
	<label for="userfile">Upload a save file</label>
	<input
		accept="application/json"
		name="userfile"
		id="userfile"
		type="file"
		oninput={() => {
			// i tried submitting the form but it redirects and i don't like that... so we must click this invisible submit button instead
			button.click();
		}}
	/>
	<noscript><input type="submit" /></noscript>
	<input type="submit" style="display: none" bind:this={button} />
</form>

<style>
	label {
		color: white;
	}
</style>
