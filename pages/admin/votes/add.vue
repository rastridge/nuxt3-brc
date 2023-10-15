<script setup>
	const { onSubmitAdd } = useSubmit()

	const onSubmit = async function (state) {
		await onSubmitAdd('votes', state)
		navigateTo(`/admin/votes`)
	}
</script>

<template>
	<div>
		<Head>
			<Title> Add Vote</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<admin-header title="Add vote" />
			</div>
			<div class="formsectionitem">
				<votes-form @submitted="onSubmit" />
			</div>
		</div>
	</div>
</template>
