import { member_infoService } from '~/server/services/member_infoService'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	return member_infoService.makeReturnLabels(body)
})
