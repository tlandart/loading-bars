<script lang="ts">
	import Bar from '$lib/components/Bar.svelte';
	import { now } from '$lib/shared.svelte';

	let { start = 0, end = 0, name = '' } = $props();
	let timeLeft = $state(0);
	let formatType = $state(0);

	$effect(() => {
		timeLeft = end - now.getTime();
	});

	/* Adapted from https://gist.github.com/flangofas/714f401b63a1c3d84aaa */
	const format = (ms: number) => {
		let sec = Math.floor(ms / 1000);
		let min = Math.floor(sec / 60);
		let hou = Math.floor(min / 60);
		let day = Math.floor(hou / 24);
		sec = parseInt((parseInt(sec.toString()) % 60).toString());
		min = parseInt((parseInt(min.toString()) % 60).toString());
		hou = parseInt((parseInt(hou.toString()) % 24).toString());
		return { day, hou, min, sec };
	};

	const formatTimestamp = (ms: number) => {
		const r = format(ms);
		const f = (s: number) => (s < 10 ? '0' + s : s);
		return `${f(r.day)}:${f(r.hou)}:${f(r.min)}:${f(r.sec)}`;
	};

	const formatWords = (ms: number) => {
		const r = format(ms);
		return `${r.day} days, ${r.hou} hours, ${r.min} minutes, ${r.sec} seconds`;
	};

	const cycleFormatType = () => {
		formatType++;
		if (formatType > 1) formatType = 0;
	};
</script>

<div class="panel">
	<Bar {start} {end} />
	{#if timeLeft >= 0}
		<span class="timestamp">{formatTimestamp(timeLeft)}</span>
	{:else}
		<span class="timestamp">00:00:00:00</span>
	{/if}
	<span class="title">{name}</span>
</div>

<style>
	.panel {
		margin-top: 5px;
		margin-bottom: 10px;
	}

	.timestamp {
		font-size: 20px;
		border: none;
		background-color: transparent;
		padding: 0;
		color: white;
	}

	.title {
		font-size: 15px;
		color: white;
	}
</style>
