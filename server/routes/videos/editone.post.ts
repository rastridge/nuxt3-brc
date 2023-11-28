import { videosService } from '~/server/services/videosService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const body = await readBody(event)
	return videosService.editOne(body)
})
