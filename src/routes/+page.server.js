import { redirect } from '@sveltejs/kit';
import { authToken } from '$lib/utils.js';

export async function load({ cookies }) {
	const token = cookies.get('token');
	
	const user = await authToken(token);

	return {
		...user
	};
}