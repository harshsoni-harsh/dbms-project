const mysql = require('mysql');

const db = mysql.createConnection({
       host: "localhost",
        user: "root",
        password: "password",
        database: "insurance"
});

db.connect(err=> {if(err)console.error("error mysql connect",err)
else console.log("connected to mysql");

}   );

module.exports =db;

