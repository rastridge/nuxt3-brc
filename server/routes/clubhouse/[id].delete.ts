import { clubhouseService } from '~/server/services/clubhouseService'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const headers = event.node.req.headers

	const id = event.context.params.id
	return clubhouseService.deleteOne(id)
})
