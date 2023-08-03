import { redirect } from '@sveltejs/kit';
import { authToken } from '$lib/utils.js';

export async function load({ cookies }) {
	const token = cookies.get('token');
	
	if (token === undefined) {
		throw redirect(300, "/signin");
	}
	
	const user = await authToken(token);

	return {
		...user
	};
}