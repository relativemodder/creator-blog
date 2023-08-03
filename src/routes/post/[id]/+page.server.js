import { redirect } from '@sveltejs/kit';
import { authToken } from '$lib/utils.js';
import { getConnection } from '$lib/database.js';

export async function load({ params, cookies }) {
	const post_id = params.id;
	const connection = getConnection();
	
	const [result, fields] = await connection.promise().query(
		"SELECT * FROM posts WHERE 1 ORDER BY id DESC LIMIT 30"
	);
	

	return {
		...result[0]
	};
}