<script lang="ts">
	import BarCardHolder from '$lib/components/BarCardHolder.svelte';
	import UserCreateForm from '$lib/components/UserCreateForm.svelte';
	import UserUploadForm from '$lib/components/UserUploadForm.svelte';
	let { data, form } = $props();
</script>

<BarCardHolder bars={data.bars} />
<UserUploadForm />
<UserCreateForm {form} />

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<style>
	.error {
		color: red;
	}
</style>
