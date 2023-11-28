import { statsService } from '~/server/services/statsService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const body = await readBody(event)
	return statsService.editOne(body)
})
