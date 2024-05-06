import mysql from "mysql2/promise";

const dbConn = mysql.createConnection(`${process.env.CONNECTION_URI}`);

export default dbConn;
