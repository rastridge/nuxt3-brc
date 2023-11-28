import { eventsService } from '~/server/services/eventsService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const body = await readBody(event)
	return eventsService.editOne(body)
})
