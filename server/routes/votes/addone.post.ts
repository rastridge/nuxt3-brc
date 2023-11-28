import { votesService } from '~/server/services/votesService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const body = await readBody(event)
	return votesService.addOne(body)
})
