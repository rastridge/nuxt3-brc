<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// Accounts form action
	//
	const onSubmit = async function (form_state) {
		alert.clear()
		await onSubmitAdd('accounts_flag', form_state)
		if (alert.message === null) {
			navigateTo(`/admin/accounts_flag`)
		}
	}
</script>

<template>
	<div>
		<Head>
			<Title>Add Flag Account</Title>
		</Head>
		<common-header title="Add Flag account" />
		<accounts-flag-form @submitted="onSubmit" />
	</div>
</template>
