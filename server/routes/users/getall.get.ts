import { usersService } from '~/server/services/usersService'

export default defineEventHandler((event) => {
	protectEndpoint(event)
	return usersService.getAll()
})
