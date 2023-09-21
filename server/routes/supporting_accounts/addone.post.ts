import { supportingaccountsService } from '~/server/services/supportingaccountsService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	console.log('IN route body = ', body)
	return supportingaccountsService.addOne(body)
})
