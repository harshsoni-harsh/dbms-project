import mysql from "mysql2/promise";
// import fs from "fs";

const dbConn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // ssl: {
    //     ca: fs.readFileSync("../ssl/ca.pem"),
    // },
});

export default dbConn;
