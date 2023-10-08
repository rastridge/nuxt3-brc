import { accountsFlagService } from '~/server/services/accountsFlagService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id
	return accountsFlagService.deleteOne(id)
})
