import { videosService } from '~/server/services/videosService'

export default defineEventHandler((event) => {
	protectEndpoint(event)
	return videosService.getAll()
})
