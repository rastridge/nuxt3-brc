import { opponentsService } from '~/server/services/opponentsService'

export default defineEventHandler(async (event) => {
	if (okProtectedEndpoint(event)) {
		const body = await readBody(event)
		return opponentsService.addOne(body)
	} else {
		return 'restricted'
	}
})
