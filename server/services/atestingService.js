const CONFIG = useRuntimeConfig()
const { doDBQueryDatestring } = useQuery()

export const atestingService = {
	getAll,
	getOne,
	editOne,
	addOne,
}

async function getAll() {
	const sql = `SELECT
								*
                FROM
									atesting
                WHERE
									1`
	const results = await doDBQueryDatestring(sql)
	return results
}

async function getOne(id) {
	const sql =
		`SELECT
				*
			FROM
					atesting
			WHERE
				id = ` + id

	const results = await doDBQueryDatestring(sql)
	return results[0]
}

/* async function addOne() {
	const sql = `INSERT INTO atesting () value ()`

	const results = await doDBQueryDatestring(sql)
	return results
} */

async function addOne({ datetime_type, timestamp_type }) {
	const sql = `INSERT INTO atesting SET
								datetime_type = ?,
								timestamp_type = ?`
	let inserts = []
	inserts.push(datetime_type, timestamp_type)
	const results = await doDBQueryDatestring(sql, inserts)
	return results
}

async function editOne({ id, datetime_type, timestamp_type }) {
	const sql = `UPDATE atesting SET
								datetime_type = ?,
								timestamp_type = ?
							WHERE event_id = ?`

	let inserts = []
	inserts.push(datetime_type, timestamp_type, id)

	const results = await doDBQueryDatestring(sql, inserts)
	return results
}
