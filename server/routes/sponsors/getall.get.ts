import { sponsorsService } from '~/server/services/sponsorsService'

export default defineEventHandler((event) => {
	protectEndpoint(event)
	return sponsorsService.getAll()
})
