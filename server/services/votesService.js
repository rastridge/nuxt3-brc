import mysql from 'mysql2/promise'
const { doDBQueryBuffalorugby } = useQuery()
const { sendEmail } = useEmail()

export const votesService = {
	getAll,
	getAllCurrent,
	getChoices,
	getUsedChoices,
	getQuestions,
	getOne,
	editOne,
	addOne,
	sendBallot,
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

	const choices = await doDBQueryBuffalorugby(sql)
	return choices
}

async function getUsedChoices() {
	// get all choices for all questions?
	const sql = `SELECT
									c.vote_question_id,
									vote_choice,
									vote_picked_cnt,
									vote_choice_id
								FROM
									inbrc_votes_choices as c,
									inbrc_votes as v
								WHERE
									c.vote_question_id = v.vote_question_id
									AND
									v.STATUS = 1`

	const usedchoices = await doDBQueryBuffalorugby(sql)
	return usedchoices
}

async function getQuestions(account_email) {
	const sql = `SELECT
								v.vote_question_id,
								v.vote_question
							FROM
								inbrc_votes v
							WHERE
								v.deleted = 0 AND
								v.STATUS = 1 AND
							NOT EXISTS (
								SELECT
										*
								FROM
									inbrc_votes_voted vv
								WHERE
										vv.voted_email LIKE '${account_email}'
								AND
									vv.vote_question_id = v.vote_question_id
							)`

	const questions = await doDBQueryBuffalorugby(sql)
	return questions
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

async function editOne({ vote_question, choices, id }) {
	const conn = await mysql.createConnection({
		host: 'mysql.buffalorugby.org',
		user: 'rastridge',
		password: 'a1s2d3f4',
		database: 'buffalorugby',
	})

	try {
		await conn.query('START TRANSACTION')

		// Update the question
		let sql = `UPDATE inbrc_votes
									SET
										vote_question = ?,
										modified_dt = NOW()
									WHERE vote_question_id = ?`

		let inserts = []
		inserts.push(vote_question, id)
		sql = mysql.format(sql, inserts)
		await conn.execute(sql)

		// delete existing choices
		sql = `DELETE FROM inbrc_votes_choices WHERE vote_question_id = ${id}`
		await conn.execute(sql)

		// insert updated choices
		await choices.forEach(async (e) => {
			let sql = `INSERT INTO inbrc_votes_choices
										( vote_question_id,
											vote_choice,
											vote_picked_cnt) 
										VALUES (?, ?, ?)`
			let inserts = []
			inserts.push(id, e.vote_choice, e.vote_picked_cnt)
			sql = mysql.format(sql, inserts)
			await conn.execute(sql)
		})

		await conn.commit()
		await conn.end()
		return 'COMMIT'
	} catch (e) {
		await conn.query('ROLLBACK')
		await conn.end()
		return 'ROLLBACK'
	}
}

async function addOne({ vote_question, choices }) {
	// insert new question
	const sql = `INSERT INTO inbrc_votes SET
                    vote_question = ?,
                    status = 1,
                    deleted = 0,
                    created_dt = NOW(),
                    modified_dt = NOW()`

	const inserts = []
	inserts.push(vote_question)
	const votes = await doDBQueryBuffalorugby(sql, inserts)
	const newId = votes.insertId
	console.log('newId= ', newId)
	// insert updated choices
	await choices.forEach(async (e) => {
		let sql = `INSERT INTO inbrc_votes_choices
										( vote_question_id,
											vote_choice,
											vote_picked_cnt) 
										VALUES (?, ?, ?)`
		let inserts = []
		inserts.push(newId, e.vote_choice, e.vote_picked_cnt)
		sql = mysql.format(sql, inserts)
		await doDBQueryBuffalorugby(sql, inserts)
	})
	return votes
}

async function sendBallot(email) {
	const htmlBody =
		'<h3>Heads up: <br>There may be more than one available question on which to vote. If so, the next question will come up when the current one is submitted.' +
		'<br>' +
		'<br>' +
		'Your vote is final once you hit Submit' +
		'<br>' +
		'<br>' +
		'You can read the choices, Cancel and come back later to finish' +
		'<br>' +
		'<br>' +
		`<a href="http://localhost:3000/admin/votes/form?account_email=` +
		email.email +
		'">Start Voting Here</></h3>'

	console.log(email.email, 'Vote', htmlBody)
	sendEmail(email.email, 'Vote', htmlBody)
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
