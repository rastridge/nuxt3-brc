import { member_infoService } from '~/server/services/member_infoService'

export default defineEventHandler((event) => {
	return member_infoService.getAll()
})
