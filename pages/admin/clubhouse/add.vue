<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// archives form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('clubhouse', form_state)
		navigateTo(`/admin/clubhouse`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add clubhouse Item</Title>
		</Head>
		<admin-header title="Add clubhouse item" />
		<clubhouse-form app="clubhouse" @submitted="onSubmit" />
	</div>
</template>

<style scoped></style>
