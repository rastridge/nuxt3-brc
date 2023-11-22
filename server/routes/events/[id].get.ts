import { eventsService } from '~/server/services/eventsService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id
	// console.log('in getone route id = ', id)
	return eventsService.getOne(id)
})
