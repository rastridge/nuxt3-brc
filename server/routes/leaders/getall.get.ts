import { leadersService } from '~/server/services/leadersService'

export default defineEventHandler((event) => {
	protectEndpoint(event)
	return leadersService.getAll()
})
