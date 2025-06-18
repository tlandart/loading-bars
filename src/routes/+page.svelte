<script lang="ts">
	import BarCardHolder from '$lib/components/BarCardHolder.svelte';
	import UserCreateForm from '$lib/components/UserCreateForm.svelte';
	import UserUploadForm from '$lib/components/UserUploadForm.svelte';
	let { data } = $props();
</script>

<BarCardHolder bars={data.bars} />
<UserUploadForm />
<UserCreateForm />
