import { supportingaccountsService } from '~/server/services/supportingaccountsService'

export default defineEventHandler(async (event) => {
	const id = event.context.params.id
	return supportingaccountsService.deleteOne(id)
})
