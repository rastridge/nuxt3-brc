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

		<div>
			<render-list
				:data="content_data"
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
	definePageMeta({
		middleware: ['auth'],
	})
	import { usePlacemarkStore } from '~/stores'
	const placemark = usePlacemarkStore()

	const { getAll, deleteOne, changeStatusOne } = useFetchAll()
	const { getAccess } = useRenderListAccess()

	//
	// Initialize values for Renderlist
	//
	const app = 'content'
	const page = ref(placemark.getPage)
	const { editable, addable, deleteable, statusable, viewable } = getAccess(app)
	const { data: content_data, pending } = await getAll(app)

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
