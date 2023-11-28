import { archivesService } from '~/server/services/archivesService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const id = event.context.params.id
	return archivesService.getOne(id)
})
