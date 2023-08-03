import { json } from '@sveltejs/kit';
import { getConnection } from '$lib/database';
import crypto from 'crypto';

function makeToken(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export async function POST({ request, cookies }) {
	const { username, email, password } = await request.json();
	const token = makeToken(64);	
	const connection = getConnection();
	
	let md5sum = crypto.createHash('md5');
	md5sum.update(password);
	const password_hash = md5sum.digest('hex');
	
	let final_response = { token };
	
	const select_result = await connection.promise().query(
		"SELECT * FROM users WHERE email = ? OR username LIKE ?", 
		[email, username]);
		
	
	console.log("Fetch data: ", select_result);
	if (select_result.length > 0) {
		final_response = {
			error: "user_already_exists"
		};
	}
	
	connection.query(`INSERT INTO users 
	(username, email, password, token) 
		VALUES
	(?, ?, ?, ?)`, [
		username,
		email,
		password_hash,
		token
	], (err, results) => {
		if (err) {
			final_response = {
				error: "database_error"
			};
		}
	});
	
	if (final_response.error === undefined) cookies.set('token', token);
	
	connection.close();
	
	return json(final_response);
}