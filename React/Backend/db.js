const { Sequelize } = require("sequelize");
const dotenv = require('dotenv').config();
const Connection = new Sequelize(
  'reactdb',
  'root',
  '',  
         
  {
    host: 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT,
  }
  
);
Connection.authenticate()
  .then(() => console.log(`MySQL DB connected successfully run on port ${process.env.DB_PORT}`))
  .catch(err => console.error("DB connection failed:", err));

module.exports = Connection;