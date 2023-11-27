import { accountsService } from '~/server/services/accountsService'

export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig()
	protectEndpoint(event)

	const body = await readBody(event)
	return accountsService.addOne(body)
})
