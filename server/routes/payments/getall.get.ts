import { paymentsService } from '~/server/services/paymentsService'

export default defineEventHandler((event) => {
	protectEndpoint(event)
	return paymentsService.getAll()
})
