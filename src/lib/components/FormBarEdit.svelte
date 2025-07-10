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
		if (event.currentTarget !== document.activeElement) event.currentTarget.focus();
	}
</script>

<form method="POST" action="?/editbar" onsubmit={() => dialogClose()} use:enhance>
	<input name="editid" type="hidden" value={bar.id} />
	<input name="editoldstart" type="hidden" value={bar.start} />
	<input name="editoldend" type="hidden" value={bar.end} />
	<div class="forminputpanel">
		<label for={'editname' + bar.id} style:margin="0 5px">Name</label>
		<input
			id={'editname' + bar.id}
			name="editname"
			type="text"
			autocomplete="off"
			value={bar.name}
			defaultValue={bar.name}
		/>
	</div>
	<input name="editabsoluteform" type="hidden" value={absoluteFormToggle} />
	<button
		class="formtogglebutton"
		type="button"
		onclick={(e) => {
			e.preventDefault();
			absoluteFormToggle = !absoluteFormToggle;
		}}
	>
		{#if absoluteFormToggle}
			<div class="formtogglebuttonbg">Relative</div>
			<div class="formtogglebuttonabsolute">Absolute</div>
		{:else}
			<div class="formtogglebuttonrelative">Relative</div>
			<div class="formtogglebuttonbg">Absolute</div>
		{/if}
	</button>
	{#if absoluteFormToggle}
		<div class="forminputpanelholder">
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
				style:margin-bottom="11px"
			/>
		</div>
	{:else}
		<div class="forminputpanelwrapper">
			<div class="forminputpanelholder">
				<header>Add to start</header>
				<div class="forminputpanel">
					<div class="forminput">
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
						<label for={'editrelativestarthou' + bar.id}>hours</label>
					</div>
					<div class="forminput">
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
						<label for={'editrelativestartmin' + bar.id}>minutes</label>
					</div>
					<div class="forminput">
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
					</div>
				</div>
			</div>
			<div class="forminputpanelholder">
				<header>Add to end</header>
				<div class="forminputpanel">
					<div class="forminput">
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
						<label for={'editrelativeendhou' + bar.id}>hours</label>
					</div>
					<div class="forminput">
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
						<label for={'editrelativeendmin' + bar.id}>minutes</label>
					</div>
					<div class="forminput">
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
					</div>
				</div>
			</div>
		</div>
	{/if}
	<input type="submit" value="Confirm" />
</form>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<style>
	@import '$lib/shared';
</style>
