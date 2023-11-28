import { votesService } from '~/server/services/votesService'

export default defineEventHandler((event) => {
	protectEndpoint(event)
	return votesService.getAll()
})
