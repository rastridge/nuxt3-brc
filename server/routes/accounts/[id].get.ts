import { accountsService } from '~/server/services/accountsService'
import protectEndpoint from '~/server/utils/protectEndpoint'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const id = event.context.params.id
	return accountsService.getOne(id)
})
