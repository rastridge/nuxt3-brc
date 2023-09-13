<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// archives form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('archive', form_state)
		navigateTo(`/admin/archive`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add archive Item</Title>
		</Head>
		<admin-header title="Add archive item" />
		<archive-form app="archive" @submitted="onSubmit" />
	</div>
</template>

<style scoped></style>
