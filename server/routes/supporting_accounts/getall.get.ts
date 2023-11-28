import { supportingaccountsService } from '~/server/services/supportingaccountsService'

export default defineEventHandler((event) => {
	protectEndpoint(event)
	return supportingaccountsService.getAll()
})
