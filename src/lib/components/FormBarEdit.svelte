<script lang="ts">
	import { enhance } from '$app/forms';

	// corresponding to the bar that this form is editing
	let { bar, form, dialogClose = () => {} } = $props();
	let absoluteFormToggle = $state(false);

	// for default values in absolute form
	const getDateStrings = () => {
		const startDate = new Date(bar.start);
		const endDate = new Date(bar.end);
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

<form method="POST" action="?/editbar" onsubmit={() => dialogClose()} use:enhance>
	<input name="editid" type="hidden" value={bar.id} />
	<input name="editoldstart" type="hidden" value={bar.start} />
	<input name="editoldend" type="hidden" value={bar.end} />
	<label for={'editname' + bar.id}>Name</label>
	<input
		id={'editname' + bar.id}
		name="editname"
		type="text"
		autocomplete="off"
		value={bar.name}
		defaultValue={bar.name}
	/>
	<input name="editabsoluteform" type="hidden" value={absoluteFormToggle} />
	{#if absoluteFormToggle}
		<label for={'editstartdatetime' + bar.id}>Start</label>
		<input
			id={'editstartdatetime' + bar.id}
			name="editstartdatetime"
			type="datetime-local"
			step="1"
			required
			defaultValue={getDateStrings().start}
			onchange={(e) => {
				console.log(e.currentTarget.value);
			}}
		/>
		<label for={'editenddatetime' + bar.id}>End</label>
		<input
			id={'editenddatetime' + bar.id}
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
			id={'editrelativestarthou' + bar.id}
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
		<label for={'editrelativestarthou' + bar.id}>hours,</label>
		<input
			id={'editrelativestartmin' + bar.id}
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
		<label for={'editrelativestartmin' + bar.id}>minutes,</label>
		<input
			id={'editrelativestartsec' + bar.id}
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
		<label for={'editrelativestartsec' + bar.id}>seconds</label>
		<header>Add to end</header>
		<input
			id={'editrelativeendhou' + bar.id}
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
		<label for={'editrelativeendhou' + bar.id}>hours,</label>
		<input
			id={'editrelativeendmin' + bar.id}
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
		<label for={'editrelativeendmin' + bar.id}>minutes,</label>
		<input
			id={'editrelativeendsec' + bar.id}
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
		<label for={'editrelativeendsec' + bar.id}>seconds</label>
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
