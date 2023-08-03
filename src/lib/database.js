import mysql from "mysql2";

const getConnection = () => {
	
	return mysql.createConnection({
		host: "localhost",
		user: "root",
		database: "gd_creator_swamp",
		password: ""
	});
	
};

export { getConnection }