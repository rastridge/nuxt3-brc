<template>
	<Button
		class="p-button-sm"
		label="Cancel"
		@click="cancelForm()"
		severity="warning"
	></Button>
</template>

<script setup>
	const props = defineProps({
		destination: { String, default: '/', required: false },
	})
	const cancelForm = () => {
		alert(props.destination)
		navigateTo(props.destination)
	}
</script>
