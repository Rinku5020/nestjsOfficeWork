const mysql = require('mysql2');
require('dotenv').config(); 

const Connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.PORT
});

Connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = Connection;