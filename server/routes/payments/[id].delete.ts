import { paymentsService } from '~/server/services/paymentsService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const id = event.context.params.id
	return paymentsService.deleteOne(id)
})
