import { accountsFlagService } from '~/server/services/accountsFlagService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	return accountsFlagService.changeStatus(body)
})