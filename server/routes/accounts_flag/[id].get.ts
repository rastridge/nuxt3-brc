import { accountsFlagService } from '~/server/services/accountsFlagService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const id = event.context.params.id
	return accountsFlagService.getOne(id)
})
