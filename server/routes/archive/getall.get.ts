import { archivesService } from '~/server/services/archivesService'

export default defineEventHandler((event) => {
	protectEndpoint(event)
	return archivesService.getAll()
})
