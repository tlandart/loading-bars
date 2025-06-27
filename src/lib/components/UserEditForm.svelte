<script lang="ts">
	import { enhance } from '$app/forms';

	// corresponding to the bar that this form is editing
	let { barId, barStart = 0, barEnd = 0, barName = '', form, dialogClose = () => {} } = $props();
	let absoluteFormToggle = $state(false);

	// for default values in absolute form
	const getDateStrings = () => {
		const startDate = new Date(barStart);
		const endDate = new Date(barEnd);
		startDate.setTime(startDate.getTime() - startDate.getTimezoneOffset() * 60000);
		endDate.setTime(endDate.getTime() - endDate.getTimezoneOffset() * 60000);
		let start = startDate.toISOString().slice(0, -5);
		let end = endDate.toISOString().slice(0, -5);
		return { start, end };
	};

	function handleWheel(event: WheelEvent & { currentTarget: EventTarget & HTMLInputElement }) {
		if (event.currentTarget !== document.activeElement) {
			let val = Number(event.currentTarget.value) - Math.sign(event.deltaY);
			val = Math.max(val, Number(event.currentTarget.min));
			val = Math.min(val, Number(event.currentTarget.max));
			event.currentTarget.value = val.toString();
		}
	}

	function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
		dialogClose();
	}
</script>

<button
	onclick={() => {
		absoluteFormToggle = !absoluteFormToggle;
	}}
>
	{#if absoluteFormToggle}
		Absolute
	{:else}
		Relative
	{/if}
</button>

<form method="POST" action="?/edit" onsubmit={(event) => handleSubmit(event)} use:enhance>
	<input name="editid" type="hidden" value={barId} />
	<input name="editoldstart" type="hidden" value={barStart} />
	<input name="editoldend" type="hidden" value={barEnd} />
	<label for={'editname' + barId}>Name</label>
	<input
		id={'editname' + barId}
		name="editname"
		type="text"
		autocomplete="off"
		value={barName}
		defaultValue={barName}
	/>
	<input name="editabsoluteform" type="hidden" value={absoluteFormToggle} />
	{#if absoluteFormToggle}
		<label for={'editstartdatetime' + barId}>Start</label>
		<input
			id={'editstartdatetime' + barId}
			name="editstartdatetime"
			type="datetime-local"
			step="1"
			required
			defaultValue={getDateStrings().start}
			onchange={(e) => {
				console.log(e.currentTarget.value);
			}}
		/>
		<label for={'editenddatetime' + barId}>End</label>
		<input
			id={'editenddatetime' + barId}
			name="editenddatetime"
			type="datetime-local"
			step="1"
			required
			defaultValue={getDateStrings().end}
			onchange={(e) => {
				console.log(e.currentTarget.value);
			}}
		/>
	{:else}
		<header>Add to start</header>
		<input
			id={'editrelativestarthou' + barId}
			name="editrelativestarthou"
			type="number"
			min="-99"
			max="99"
			defaultValue="0"
			onclick={(e) => {
				(e.target as HTMLInputElement).select();
			}}
			onwheel={handleWheel}
			required
		/>
		<label for={'editrelativestarthou' + barId}>hours,</label>
		<input
			id={'editrelativestartmin' + barId}
			name="editrelativestartmin"
			type="number"
			min="-59"
			max="59"
			defaultValue="0"
			onclick={(e) => {
				(e.target as HTMLInputElement).select();
			}}
			onwheel={handleWheel}
			required
		/>
		<label for={'editrelativestartmin' + barId}>minutes,</label>
		<input
			id={'editrelativestartsec' + barId}
			name="editrelativestartsec"
			type="number"
			min="-59"
			max="59"
			defaultValue="0"
			onclick={(e) => {
				(e.target as HTMLInputElement).select();
			}}
			onwheel={handleWheel}
			required
		/>
		<label for={'editrelativestartsec' + barId}>seconds</label>
		<header>Add to end</header>
		<input
			id={'editrelativeendhou' + barId}
			name="editrelativeendhou"
			type="number"
			min="-99"
			max="99"
			defaultValue="0"
			onclick={(e) => {
				(e.target as HTMLInputElement).select();
			}}
			onwheel={handleWheel}
			required
		/>
		<label for={'editrelativeendhou' + barId}>hours,</label>
		<input
			id={'editrelativeendmin' + barId}
			name="editrelativeendmin"
			type="number"
			min="-59"
			max="59"
			defaultValue="0"
			onclick={(e) => {
				(e.target as HTMLInputElement).select();
			}}
			onwheel={handleWheel}
			required
		/>
		<label for={'editrelativeendmin' + barId}>minutes,</label>
		<input
			id={'editrelativeendsec' + barId}
			name="editrelativeendsec"
			type="number"
			min="-59"
			max="59"
			defaultValue="0"
			onclick={(e) => {
				(e.target as HTMLInputElement).select();
			}}
			onwheel={handleWheel}
			required
		/>
		<label for={'editrelativeendsec' + barId}>seconds</label>
	{/if}
	<input type="submit" />
</form>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<style>
	header {
		color: white;
	}
</style>
