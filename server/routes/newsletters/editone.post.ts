import { newslettersService } from '~/server/services/newslettersService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const body = await readBody(event)
	return newslettersService.editOne(body)
})
