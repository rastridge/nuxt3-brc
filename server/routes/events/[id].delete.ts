import { eventsService } from '~/server/services/eventsService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)

	const id = event.context.params.id
	return eventsService.deleteOne(id)
})
