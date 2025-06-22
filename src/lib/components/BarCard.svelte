<script lang="ts">
	import { enhance } from '$app/forms';
	import Bar from '$lib/components/Bar.svelte';
	import { now } from '$lib/shared.svelte';
	import ButtonConfirm from './ButtonConfirm.svelte';

	let { id, start = 0, end = 0, name = '' } = $props();
	let timeLeft = $state(0);
	// let formatType = $state(0);

	let formBind: HTMLFormElement;

	$effect(() => {
		timeLeft = Math.min(end - now.getTime(), end - start);
		// TODO make another timer that counts down to when this bar will start
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

	// const formatWords = (ms: number) => {
	// 	const r = format(ms);
	// 	return `${r.day} days, ${r.hou} hours, ${r.min} minutes, ${r.sec} seconds`;
	// };

	// const cycleFormatType = () => {
	// 	formatType++;
	// 	if (formatType > 1) formatType = 0;
	// };
</script>

<div class="panel">
	<Bar {start} {end} />
	<div class="panelbottom">
		<div class="panelbottomleft">
			{#if timeLeft >= 0}
				<span class="timestamp">{formatTimestamp(timeLeft)}</span>
			{:else}
				<span class="timestamp">-{formatTimestamp(-timeLeft)}</span>
			{/if}
			<span class="title">{name}</span>
		</div>
		<form method="POST" action="?/delete" bind:this={formBind} use:enhance>
			<input name="id" type="hidden" value={id} />
			<ButtonConfirm
				innerText="Delete&nbsp&nbsp"
				confirmText="Delete?"
				onEnd={() => {
					formBind.requestSubmit();
				}}
			/>
		</form>
	</div>
</div>

<style>
	.panel {
		margin: 10px 0px;
		width: 100%;
	}

	.panelbottom {
		display: flex;
		height: 25px;
		margin-top: 5px;
	}

	.panelbottomleft {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: clip;
	}

	form {
		width: fit-content;
		margin-left: auto;
		margin-top: auto;
	}

	.timestamp {
		font-size: 20px;
		color: white;
		background-color: transparent;
		padding: 0px 10px;
		padding-right: 5px;
		border: none;
	}

	.title {
		font-size: 15px;
		color: var(--col-deselect);
	}
</style>
