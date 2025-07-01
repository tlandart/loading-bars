<script lang="ts">
	import { enhance } from '$app/forms';
	let { form } = $props();
	let formBind: HTMLFormElement;
</script>

<form
	method="POST"
	action="?/upload"
	enctype="multipart/form-data"
	bind:this={formBind}
	use:enhance
>
	<label for="userfile">Import save file</label>
	<input
		accept="application/json"
		name="userfile"
		id="userfile"
		type="file"
		oninput={() => {
			// note .submit() redirects, but requestSubmit() doesn't
			formBind.requestSubmit();
		}}
	/>
	<noscript><input type="submit" /></noscript>
</form>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<style>
	input {
		color: var(--col-deselect);
	}
</style>
