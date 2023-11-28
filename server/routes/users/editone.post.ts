import { usersService } from '~/server/services/usersService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const body = await readBody(event)
	return usersService.editOne(body)
})
