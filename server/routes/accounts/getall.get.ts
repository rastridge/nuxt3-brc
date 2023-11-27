import { accountsService } from '~/server/services/accountsService'

export default defineEventHandler((event) => {
	protectEndpoint(event)

	return accountsService.getAll()
})
