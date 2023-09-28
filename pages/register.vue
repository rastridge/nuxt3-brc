<script setup>
	import { useAlertStore } from '~/stores/alertStore'
	const alert = useAlertStore()
	const { onSubmitAdd } = useSubmit()

	//
	// Accounts form action
	//
	const onSubmit = async function (form_state) {
		alert.clear()
		await onSubmitAdd('accounts', form_state)
		if (alert.message === null) {
			navigateTo(`/`)
		}
	}
</script>

<template>
	<div>
		<Head>
			<Title>Register to Join</Title>
		</Head>
		<common-header title="Register to Join" />
		<register-form @submitted="onSubmit" />
	</div>
</template>
