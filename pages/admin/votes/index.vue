<template>
	<div>
		<Head>
			<Title>{{ app }} List</Title>
		</Head>
		<div class="topsectioncenter">
			<div class="topsectionitem">
				<admin-header :title="app" />
			</div>
		</div>
		<div v-if="!votes" class="topsectionitem">Loading ...</div>

		<div v-else class="renderlist-enclosure">
			<render-list
				:data="votes"
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
</template>

<script setup>
	const { getAll, deleteOne, changeStatusOne } = useFetchAll()
	const { getAccess } = useRenderListAccess()

	//
	// Initialize values for Renderlist
	//
	const app = 'votes'
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
	const { data: votes, pending } = await getAll(app)

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
