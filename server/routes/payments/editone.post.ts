import { paymentsService } from '~/server/services/paymentsService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const body = await readBody(event)
	return paymentsService.editOne(body)
})
