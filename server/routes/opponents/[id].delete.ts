import { opponentsService } from '~/server/services/opponentsService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const id = event.context.params.id
	return opponentsService.deleteOne(id)
})
