<script lang="ts">
	import { enhance } from '$app/forms';
	import { abs } from 'mathjs';
	import { onMount } from 'svelte';

	let { form, dialogClose = () => {}, createFormToggle = false } = $props();
	let startNowToggle = $state(true);
	let absoluteFormToggle = $state(false);
	let focusThis: HTMLInputElement | null = $state(null);

	function handleWheel(event: WheelEvent & { currentTarget: EventTarget & HTMLInputElement }) {
		// if (event.currentTarget !== document.activeElement) {
		// 	let val = Number(event.currentTarget.value) - Math.sign(event.deltaY);
		// 	val = Math.max(val, Number(event.currentTarget.min));
		// 	val = Math.min(val, Number(event.currentTarget.max));
		// 	event.currentTarget.value = val.toString();
		// }
		if (event.currentTarget !== document.activeElement) event.currentTarget.focus();
	}
</script>

<form method="POST" action="?/createbar" onsubmit={() => dialogClose()} use:enhance>
	<label for="name">Name</label>
	<!-- Maybe not the best idea but makes it faster to create -->
	<!-- svelte-ignore a11y_autofocus -->
	<input
		id="name"
		name="name"
		type="text"
		autocomplete="off"
		onfocus={(e) => {
			(e.target as HTMLInputElement).select();
		}}
		value="New Bar"
		required
		autofocus
	/>
	<input name="absoluteform" type="hidden" value={absoluteFormToggle} />
	<input
		id="startnow"
		name="startnow"
		type="checkbox"
		bind:checked={startNowToggle}
		defaultChecked={startNowToggle}
	/>
	<label for="startnow">Start on submit</label>
	<button
		class="formtogglebutton"
		onclick={(e) => {
			e.preventDefault();
			absoluteFormToggle = !absoluteFormToggle;
		}}
	>
		{#if absoluteFormToggle}
			<div class="formtogglebuttonbg"></div>
			<div class="formtogglebuttonabsolute">Absolute</div>
		{:else}
			<div class="formtogglebuttonrelative">Relative</div>
			<div class="formtogglebuttonbg"></div>
		{/if}
	</button>
	{#if absoluteFormToggle}
		{#if !startNowToggle}
			<label for="startdatetime">Start</label>
			<input id="startdatetime" name="startdatetime" type="datetime-local" step="1" required />
		{/if}
		<label for="enddatetime">End</label>
		<input id="enddatetime" name="enddatetime" type="datetime-local" step="1" required />
	{:else}
		{#if !startNowToggle}
			<header>Start in</header>
			<div class="formscrollinputpanel">
				<div class="formscrollinput">
					<input
						id="relativestarthou"
						name="relativestarthou"
						type="number"
						min="0"
						max="99"
						defaultValue="0"
						onclick={(e) => {
							(e.target as HTMLInputElement).select();
						}}
						onwheel={handleWheel}
						required
					/>
					<label for="relativestarthou">hours</label>
				</div>
				<div class="formscrollinput">
					<input
						id="relativestartmin"
						name="relativestartmin"
						type="number"
						min="0"
						max="59"
						defaultValue="0"
						onclick={(e) => {
							(e.target as HTMLInputElement).select();
						}}
						onwheel={handleWheel}
						required
					/>
					<label for="relativestartmin">minutes</label>
				</div>
				<div class="formscrollinput">
					<input
						id="relativestartsec"
						name="relativestartsec"
						type="number"
						min="0"
						max="59"
						defaultValue="0"
						onclick={(e) => {
							(e.target as HTMLInputElement).select();
						}}
						onwheel={handleWheel}
						required
					/>
					<label for="relativestartsec">seconds</label>
				</div>
			</div>
		{/if}
		<header>End in</header>
		<div class="formscrollinputpanel">
			<div class="formscrollinput">
				<input
					id="relativeendhou"
					name="relativeendhou"
					type="number"
					min="0"
					max="99"
					defaultValue="0"
					onclick={(e) => {
						(e.target as HTMLInputElement).select();
					}}
					onwheel={handleWheel}
					required
				/>
				<label for="relativeendhou">hours</label>
			</div>
			<div class="formscrollinput">
				<input
					id="relativeendmin"
					name="relativeendmin"
					type="number"
					min="0"
					max="59"
					defaultValue="10"
					onclick={(e) => {
						(e.target as HTMLInputElement).select();
					}}
					onwheel={handleWheel}
					required
				/>
				<label for="relativeendmin">minutes</label>
			</div>
			<div class="formscrollinput">
				<input
					id="relativeendsec"
					name="relativeendsec"
					type="number"
					min="0"
					max="59"
					defaultValue="0"
					onclick={(e) => {
						(e.target as HTMLInputElement).select();
					}}
					onwheel={handleWheel}
					required
				/>
				<label for="relativeendsec">seconds</label>
			</div>
		</div>
	{/if}
	<input type="submit" />
</form>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<style>
	@import '$lib/shared';

	header {
		color: white;
	}
</style>
