import { usersService } from '~/server/services/usersService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const id = event.context.params.id
	return usersService.getOne(id)
})
