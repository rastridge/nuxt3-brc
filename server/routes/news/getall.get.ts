import { newsService } from '~/server/services/newsService'

export default defineEventHandler((event) => {
	protectEndpoint(event)
	return newsService.getAll()
})
