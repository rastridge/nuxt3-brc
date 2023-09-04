import { supportingaccountsService } from '~/server/services/supportingaccountsService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	// console.log('IN router body = ', body)
	return supportingaccountsService.editOne(body)
})
