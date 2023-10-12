import { votesService } from '~/server/services/votesService'

export default defineEventHandler((event) => {
	const id = event.context.params.id
	console.log('id=', id)
	return votesService.getChoices(id)
})
