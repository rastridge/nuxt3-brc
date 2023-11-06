import { votesService } from '~/server/services/votesService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	console.log('body= ', body)
	return votesService.sendBallot(body)
})
