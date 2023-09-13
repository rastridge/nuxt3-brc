<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitEdit } = useSubmit()

	//
	// Get archives item id
	//
	const route = useRoute()
	const id = ref(route.params.id)

	//
	// archives form action
	//
	const onSubmit = async function (form_state) {
		await onSubmitEdit('archive', form_state)
		navigateTo(`/admin/archive`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit archive Item {{ id }}</Title>
		</Head>
		<admin-header title="Edit archive Item" />
		<archive-form app="archive" :id="id" @submitted="onSubmit" />
	</div>
</template>
