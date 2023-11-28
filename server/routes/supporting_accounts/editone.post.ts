import { supportingaccountsService } from '~/server/services/supportingaccountsService'

export default defineEventHandler(async (event) => {
	protectEndpoint(event)
	const body = await readBody(event)
	return supportingaccountsService.editOne(body)
})
