import { newslettersService } from '~/server/services/newslettersService'

export default defineEventHandler(async (event) => {
	const year = event.context.params.year
	console.log('route year = ', year)

	return newslettersService.getYear(year)
})
