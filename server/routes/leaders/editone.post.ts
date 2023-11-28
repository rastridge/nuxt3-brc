import { leadersService } from '~/server/services/leadersService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const body = await readBody(event)
	return leadersService.editOne(body)
})
