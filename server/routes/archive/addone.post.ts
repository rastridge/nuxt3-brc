import { archivesService } from '~/server/services/archivesService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	return archivesService.addOne(body)
})
