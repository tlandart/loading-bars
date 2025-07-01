<script lang="ts">
	let { form } = $props();

	async function downloadSave() {
		const res = await fetch('/download');

		if (!res.ok) {
			throw new Error(`Response status: ${res.status}`);
		}

		const blob = await res.blob();
		const url = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.href = url;
		a.download = 'loading-bars-save.json';
		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
	}
</script>

<form onsubmit={downloadSave}>
	<input id="download" name="download" type="submit" value="Download" />
	<label for="download">Export save file</label>
</form>

<style>
</style>
