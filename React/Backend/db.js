const { Sequelize } = require("sequelize");
const dotenv = require('dotenv').config();
const Connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,  
         
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.PORT, 
  }
);

module.exports = Connection;