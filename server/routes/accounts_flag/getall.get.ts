import { accountsFlagService } from '~/server/services/accountsFlagService'

export default defineEventHandler((event) => {
	return accountsFlagService.getAll()
})
