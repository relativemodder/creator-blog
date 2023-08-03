import { json } from '@sveltejs/kit';
import { authToken, getTimestampInSeconds } from '$lib/utils.js';
import { getConnection } from '$lib/database.js';

export async function GET({ url, request, cookies }) {
	const connection = getConnection();
	const more_than = url.searchParams.get('more_than') != null ? Number(url.searchParams.get('more_than')) : 0;
	
	const limit = 30 + more_than;
	
	const [result, fields] = await connection.promise().query(
		"SELECT * FROM posts WHERE 1 ORDER BY id DESC LIMIT " + limit
	);
	
	connection.close();
	
	return json([
		...result
	]);
}

export async function POST({ request, cookies }) {
	const { preview, title, subtitle, content } = await request.json();
	
	const token = cookies.get("token");
	const user = await authToken(token);
	
	if (user === undefined || user?.is_admin == 0) {
		return json({
			error: 'no_permissions'
		});
	}
	
	const connection = getConnection();
	const ts = getTimestampInSeconds();
	
	const [result, f] = await connection.promise().query(
		"INSERT INTO posts (author_user_id, preview, title, subtitle, content, timestamp) VALUES (?, ?, ?, ?, ?, ?)",
		[user.id, preview, title, subtitle, content, ts]
	);
	
	const post_id = result.insertId;
	
	connection.close();
	
	return json({
		post_id
	});
}