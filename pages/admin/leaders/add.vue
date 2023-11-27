<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	const { onSubmitAdd } = useSubmit()

	// Sponsors form action
	//
	const onSubmit = async function (state) {
		await onSubmitAdd('leaders', state)
		navigateTo(`/admin/leaders`)
	}
</script>

<template>
	<div>
		<Head>
			<Title> Add leaders</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<admin-header title="Add leaders" />
			</div>
			<div class="formsectionitem">
				<leaders-form @submitted="onSubmit" />
			</div>
		</div>
	</div>
</template>
