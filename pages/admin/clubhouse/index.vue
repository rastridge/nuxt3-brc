<template>
	<div>
		<Head>
			<Title>{{ app }} admin</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<admin-header :title="app" />
			</div>
			<div v-if="pending" class="topsectionitem">Loading ...</div>
		</div>
		<render-list
			:data="clubhouse_data"
			:app="app"
			:statusable="statusable"
			:editable="editable"
			:deleteable="deleteable"
			:addable="addable"
			:viewable="viewable"
			@changeStatus="changeStatus"
			@deleteItem="deleteItem"
		/>
	</div>
</template>

<script setup>
	const { getAll, deleteOne, changeStatusOne } = useFetchAll()
	//
	// Initialize values for Renderlist
	//
	const { getAccess } = useRenderListAccess()
	const app = 'clubhouse'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)

	//
	// Get all clubhouse
	//
	const { data: clubhouse_data, pending } = await getAll(app)

	//
	// Renderlist actions
	//
	const deleteItem = async (id) => {
		await deleteOne(app, id)
	}

	const changeStatus = async ({ id, status }) => {
		await changeStatusOne(app, { id, status })
	}
</script>
