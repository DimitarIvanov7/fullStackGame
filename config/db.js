import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql2.createPool({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
});

// let sql = "SELECT * FROM clothes";

// pool.execute(sql, (err, result) => {
// 	if (err) throw err;
// 	else console.log(result);
// });

export default pool.promise();
