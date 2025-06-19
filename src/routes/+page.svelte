<script lang="ts">
	import BarCardHolder from '$lib/components/BarCardHolder.svelte';
	import UserCreateForm from '$lib/components/UserCreateForm.svelte';
	import UserUploadForm from '$lib/components/UserUploadForm.svelte';
	let { data, form } = $props();
</script>

<div class="page">
	<BarCardHolder bars={data.bars} />
	<UserUploadForm {form} />
	<UserCreateForm {form} />

	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}
</div>

<style>
	.page {
		width: 60%;
		margin-top: 100px;
		margin-left: auto;
		margin-right: auto;
	}
	.error {
		color: red;
	}
</style>
