import { opponentsService } from '~/server/services/opponentsService'

export default defineEventHandler((event) => {
	protectEndpoint(event)
	return opponentsService.getAll()
})
