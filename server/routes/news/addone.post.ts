import { newsService } from '~/server/services/newsService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const body = await readBody(event)
	return newsService.addOne(body)
})
