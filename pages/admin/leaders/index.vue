<template>
	<div>
		<Head>
			<Title>{{ app }} Admin</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<admin-header :title="app" />
			</div>
			<div v-if="pending" class="topsectionitem">Loading ...</div>
			<div v-else class="renderlist-enclosure">
				<render-list
					:data="leaders"
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
		</div>
	</div>
</template>

<script setup>
	//
	// Initialize values for Renderlist
	//
	const app = 'leaders'
	const { getAccess } = useRenderListAccess()
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
	const { getAll, deleteOne, changeStatusOne } = useFetchAll()
	const { data: leaders, pending } = await getAll(app)

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
