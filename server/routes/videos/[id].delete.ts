import { videosService } from '~/server/services/videosService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const id = event.context.params.id
	return videosService.deleteOne(id)
})
