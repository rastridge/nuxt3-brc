const { doDBQueryBuffalorugby } = useQuery()
export const votesService = {
	getAll,
	getAllCurrent,
	getChoices,
	getOne,
	editOne,
	addOne,
	deleteOne,
	changeStatus,
}

async function getAll() {
	const sql = `SELECT
                    vote_question_id,
                    vote_question_id as id,
                    vote_question,
                    vote_question as title,
                    status,
                    deleted,
                    created_dt,
                    modified_dt,
                    modified_dt
                FROM
                    inbrc_votes
                WHERE
                    deleted = 0
                ORDER BY
                    id DESC`

	const videos = await doDBQueryBuffalorugby(sql)
	return videos
}

async function getAllCurrent() {
	const sql = `SELECT
                    vote_question_id,
                    vote_question_id as id,
                    vote_question,
                    vote_question as title,
                    status,
                    deleted,
                    created_dt,
                    modified_dt,
                    modified_dt
                FROM
                    inbrc_votes
                WHERE
                    deleted = 0
                    AND
                    status = 1
										AND
										DATEDIFF( CURDATE(), video_expire_dt)  <=  0
                ORDER BY
                    id DESC`

	const videos = await doDBQueryBuffalorugby(sql)
	return videos
}

async function getChoices(id) {
	const sql = `SELECT
									vote_choice,
									vote_picked_cnt,
									vote_choice_id
								FROM inbrc_votes_choices
								WHERE vote_question_id= ${id}`

	console.log('sql=', sql)
	const choices = await doDBQueryBuffalorugby(sql)
	return choices
}

async function getOne(id) {
	const sql = `SELECT
									vote_question_id,
									vote_question_id as id,
									vote_question,
									vote_vote_cnt,
									status,
									deleted,
									created_dt,
									modified_dt
                 FROM
                    inbrc_votes
                WHERE
									deleted = 0
									AND
									vote_question_id = ${id}`

	const votes = await doDBQueryBuffalorugby(sql)
	return votes[0]
}

async function editOne({ vote_question, id }) {
	const sql = `UPDATE inbrc_votes SET
                vote_question = ?,
                modified_dt = NOW()
            WHERE vote_question_id = ?`
	var inserts = []
	inserts.push(vote_question, id)
	const votes = await doDBQueryBuffalorugby(sql, inserts)
	return votes
}

async function addOne({ vote_question }) {
	const sql = `INSERT INTO inbrc_votes SET
                    vote_question = ?,
                    status = 1,
                    deleted = 0,
                    created_dt = NOW(),
                    modified_dt = NOW()`

	const inserts = []
	inserts.push(vote_question)
	const votes = await doDBQueryBuffalorugby(sql, inserts)
	return votes
}

async function deleteOne(id) {
	const sql =
		`UPDATE inbrc_votes SET deleted = 1, deleted_dt= NOW() WHERE vote_question_id = ` +
		id
	const votes = await doDBQueryBuffalorugby(sql)
	return votes
}

async function changeStatus({ id, status }) {
	const sql =
		`UPDATE inbrc_votes SET status = "` +
		status +
		`" WHERE vote_question_id = ` +
		id
	const votes = await doDBQueryBuffalorugby(sql)
	return votes
}
