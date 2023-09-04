<script setup>
	const { onSubmitEdit } = useSubmit()

	//
	// Get sponsor id
	//
	const route = useRoute()
	const id = ref(route.params.id)
	//
	// leaders form action
	//
	const onSubmit = async function (state) {
		await onSubmitEdit('supporting_accounts', state)
		navigateTo(`/admin/supporting_accounts`)
	}
</script>

<template>
	<div>
		<Head>
			<Title>Edit Supporting Accounts {{ id }}</Title>
		</Head>
		<admin-header title="Supporting Accounts" />
		<supportingaccounts-form :id="id" @submitted="onSubmit" />
	</div>
</template>
