<template>
	<div>
		<Head>
			<Title>{{ app }} Administration</Title>
		</Head>
		<admin-header :title="app" />
		<div v-if="pending" class="text-center text-2xl">Loading ...</div>
		<div v-else>
			<render-list
				:data="supportingaccounts"
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
	//
	// Initialize values for Renderlist
	//
	const app = 'supporting_accounts'
	const { getAccess } = useRenderListAccess()
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
	const { getAll, deleteOne, changeStatusOne } = useFetchAll()
	const { data: supportingaccounts, pending } = await getAll(app)

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
