import { smsService } from '~/server/services/smsService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const body = await readBody(event)
	return smsService.editOne(body)
})
