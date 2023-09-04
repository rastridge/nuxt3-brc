import { paymentsService } from '~/server/services/paymentsService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	return paymentsService.editOne(body)
})