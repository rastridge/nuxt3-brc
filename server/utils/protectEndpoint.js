export default async (event) => {
	const authorized = getHeaders(event).authorization

	if (!authorized) {
		throw createError({
			statusCode: 401,
			message: 'Unauthorized',
		})
	}
}
