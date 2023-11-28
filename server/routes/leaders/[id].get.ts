import { leadersService } from '~/server/services/leadersService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const id = event.context.params.id
	return leadersService.getOne(id)
})
