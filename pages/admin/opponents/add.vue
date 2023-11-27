<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	const { onSubmitAdd } = useSubmit()

	// Opponents form action
	//
	const onSubmit = async function (state) {
		await onSubmitAdd('opponents', state)
		navigateTo(`/admin/opponents`)
	}
</script>

<template>
	<div>
		<Head>
			<Title> Add Opponent</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<admin-header title="Add opponent" />
			</div>
			<div class="formsectionitem">
				<opponents-form @submitted="onSubmit" />
			</div>
		</div>
	</div>
</template>
