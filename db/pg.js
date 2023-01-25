// Export a function that connects to postgres

// Example from my app

// require("dotenv").config();

// const { Pool } = require("pg");

// console.log(process.env.DB_PASSWORD);

// const pool = new Pool({
//   database: process.env.DB_NAME,
//   username: process.env.DB_USER_USERNAME,
//   password: process.env.DB_USER_PASSWORD,
// });

// async function query(text, params) {
//   return await pool.query(text, params);
// }

// module.exports = query;

require ("dotenv").config();

const { Client } = require("pg");
const client = new Client({
  user: process.env.PSQL_USERNAME,
  host: process.env.PSQL_HOST, // update when we open a new TCP tunnel
  database: process.env.PSQL_DB_NAME,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT, // update when we open a new TCP tunnel
});

client
  .connect()
  .then(() => console.log('Connected to PG'))
  .catch((err) => console.log("Error connecting to PG:", err.stack))

module.exports = client;
