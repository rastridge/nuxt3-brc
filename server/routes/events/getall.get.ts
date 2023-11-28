import { eventsService } from '~/server/services/eventsService'

export default defineEventHandler((event) => {
	protectEndpoint(event)
	return eventsService.getAll()
})
