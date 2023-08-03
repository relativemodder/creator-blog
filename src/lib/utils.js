import { getConnection } from './database.js';

async function authToken(token) {
	const connection = getConnection();
	
	const [result, fields] = await connection.promise().query(
		"SELECT * FROM users WHERE token = ?",
		[token]
	);
	
	if (result.length == 0) {
		return undefined;
	}
	
	connection.close();
	
	return result[0];
}

function getTimestampInSeconds () {
  return Math.floor(Date.now() / 1000)
}

export { authToken, getTimestampInSeconds }