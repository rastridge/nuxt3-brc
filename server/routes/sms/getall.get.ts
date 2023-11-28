import { smsService } from '~/server/services/smsService'

export default defineEventHandler((event) => {
	protectEndpoint(event)
	return smsService.getAll()
})
