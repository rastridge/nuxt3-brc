const { doDBQueryBuffalorugby } = useQuery()

export const member_infoService = {
	getAll,
}

async function getAll() {
	const sql = `SELECT
					a.account_id,
					concat(a.member_lastname,", ",a.member_firstname) as name,
					a.account_addr_phone,
					a.account_email,
					a.account_email_opening,
					a.newsletter_recipient,
					a.mail_recipient,
					a.account_addr_street,
					a.account_addr_city,
					a.account_addr_state,
					concat(a.account_addr_street," ",a.account_addr_city,", ",a.account_addr_state) as address,
					a.member_type_id,
					a.member_type2_id,
					a.status,
					a.deleted,
					a.created_dt,
					a.modified_dt,
					a.modified_dt as dt,
					(
						SELECT
							COUNT(*)
						FROM
							inbrc_contributions c
						WHERE
							c.account_id = a.account_id
					) as donation_cnt
				FROM
					inbrc_accounts a
				WHERE
					a.deleted = 0
					AND
					a.status = 1
				ORDER BY
					name ASC`

	const memberinfo = await doDBQueryBuffalorugby(sql)
	return memberinfo
}
