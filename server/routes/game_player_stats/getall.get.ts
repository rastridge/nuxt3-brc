import { statsService } from '~/server/services/statsService'

export default defineEventHandler((event) => {
	protectEndpoint(event)
	return statsService.getAll()
})
