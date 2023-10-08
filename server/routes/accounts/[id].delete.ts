import { accountsFlagService } from '~/server/services/accountsFlagService'

export default defineEventHandler(async (event) => {
	// const config = useRuntimeConfig()
	// const headers = event.node.req.headers

	const id = event.context.params.id
	return accountsFlagService.deleteOne(id)
})
