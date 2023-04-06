const mysql = require("mysql2");
const dotenv = require("dotenv").config();

const env = process.env;
const dbConfig = {
  host: "containers-us-west-99.railway.app",
  database: env.DB_NAME,
  user: env.DB_UNAME,
  password: env.DB_UPASS,
  port: env.DB_PORT,
};
const connection = mysql.createPool(dbConfig).promise();

module.exports = connection;
