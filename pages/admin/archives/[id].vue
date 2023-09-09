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
		await onSubmitEdit('archives', form_state)
		navigateTo(`/admin/archives`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit archives Item {{ id }}</Title>
		</Head>
		<admin-header title="Edit archives Item" />
		<archives-form app="archives" :id="id" @submitted="onSubmit" />
	</div>
</template>
