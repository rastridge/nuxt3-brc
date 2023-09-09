<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// archives form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitAdd('archives', form_state)
		navigateTo(`/admin/archives`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add archives Item</Title>
		</Head>
		<admin-header title="Add archives item" />
		<archives-form app="archives" @submitted="onSubmit" />
	</div>
</template>

<style scoped></style>
