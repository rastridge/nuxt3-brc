<script setup>
	const { onSubmitAdd } = useSubmit()

	// Sponsors form action
	//
	const onSubmit = async function (state) {
		await onSubmitAdd('supporting_accounts', state)
		navigateTo(`/admin/supporting_accounts`)
	}
</script>

<template>
	<div>
		<Head>
			<Title> Add Supporting Acct</Title>
		</Head>
		<admin-header title="Add supporting account" />
		<supportingaccounts-form @submitted="onSubmit" />
	</div>
</template>
