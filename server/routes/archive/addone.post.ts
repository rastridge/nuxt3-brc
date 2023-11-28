import { archivesService } from '~/server/services/archivesService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const body = await readBody(event)
	return archivesService.addOne(body)
})
