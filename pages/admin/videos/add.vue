<script setup>
	definePageMeta({
		middleware: ['auth'],
	})
	const { onSubmitAdd } = useSubmit()

	const onSubmit = async function (state) {
		await onSubmitAdd('videos', state)
		navigateTo(`/admin/videos`)
	}
</script>

<template>
	<div>
		<Head>
			<Title> Add Video</Title>
		</Head>

		<div class="topsectioncenter">
			<div class="topsectionitem">
				<admin-header title="Add Video" />
			</div>
			<div class="formsectionitem">
				<videos-form @submitted="onSubmit" />
			</div>
		</div>
	</div>
</template>
