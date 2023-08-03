import { json } from '@sveltejs/kit';
import { authToken } from '$lib/utils.js';

export async function GET({ request, cookies }) {
	const token = cookies.get("token");
	const user = await authToken(token);
	
	if (user === undefined) {
		return json({
			error: 'auth_error'
		});
	}
	
	return json({
		...user
	});
}