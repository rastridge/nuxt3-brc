import { newsService } from '~/server/services/newsService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const id = event.context.params.id
	return newsService.getOne(id)
})
