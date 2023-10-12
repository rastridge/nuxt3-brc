import { votesService } from '~/server/services/votesService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id
	return votesService.getOne(id)
})
