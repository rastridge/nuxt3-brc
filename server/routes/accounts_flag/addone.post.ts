import { accountsFlagService } from '~/server/services/accountsFlagService'

export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig()
	const body = await readBody(event)
	return accountsFlagService.addOne(body)
})
