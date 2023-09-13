import { archivesService } from '~/server/services/archivesService'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const headers = event.node.req.headers

	const id = event.context.params.id
	return archivesService.deleteOne(id)
})
