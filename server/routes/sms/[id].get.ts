import { smsService } from '~/server/services/smsService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const id = event.context.params.id
	return smsService.getOne(id)
})
