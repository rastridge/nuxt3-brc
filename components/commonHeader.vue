<template>
	<div id="commonheader">
		<div class="text-center m-5 my-text-style">{{ title }}</div>
	</div>
</template>

<script setup>
	const props = defineProps({
		title: { String, required: true },
	})
</script>
