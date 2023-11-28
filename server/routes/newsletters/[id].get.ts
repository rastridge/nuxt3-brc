import { newslettersService } from '~/server/services/newslettersService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const id = event.context.params.id
	return newslettersService.getOne(id)
})
