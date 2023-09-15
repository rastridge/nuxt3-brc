import { clubhouseService } from '~/server/services/clubhouseService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	return clubhouseService.editOne(body)
})
