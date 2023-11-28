import { newslettersService } from '~/server/services/newslettersService'

export default defineEventHandler((event) => {
	protectEndpoint(event)
	return newslettersService.getAll()
})
