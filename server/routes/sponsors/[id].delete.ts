import { sponsorsService } from '~/server/services/sponsorsService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const id = event.context.params.id
	return sponsorsService.deleteOne(id)
})
