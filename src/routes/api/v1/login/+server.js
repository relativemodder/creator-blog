import { json } from '@sveltejs/kit';
import { getConnection } from '$lib/database';
import crypto from 'crypto';

export async function POST({ request, cookies }) {
	const { email, password } = await request.json();
	const connection = getConnection();
	
	let md5sum = crypto.createHash('md5');
	md5sum.update(password);
	const password_hash = md5sum.digest('hex');
	
	let final_response = {};
	
	const [select_result, fields] = await connection.promise().query(
		"SELECT * FROM users WHERE email = ? AND password = ?", 
		[email, password_hash]);
	
	console.log("Fetch data: ", select_result.length);
	
	if (select_result.length == 0) {
		final_response = {
			error: 'invalid_credentials'
		};
	}
	else {
		const user = select_result[0];
		final_response = {
			token: user.token
		};
	}
	
	connection.close();
	
	return json(final_response);
}