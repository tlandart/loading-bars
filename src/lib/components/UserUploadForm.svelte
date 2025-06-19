<script lang="ts">
	import { enhance } from '$app/forms';
	let { form } = $props();
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
			// i tried submitting the form but it redirects and that's not favourable so we must click an invisible submit button instead. same for the one in BarCard
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
	input {
		color: white;
	}
</style>
