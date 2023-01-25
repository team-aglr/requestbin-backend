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

const { Pool, Client } = require("pg");
const client = new Client({
  connectionString: process.env.PSQL_CONNECTION_STRING
});

client.connect(err => {
  if (err) {
    return console.error('Could not connect to PostgreSQL', err);
  }
  client.query('SELECT NOW() AS "theTime"', (err, result) => {
    if (err) return console.error('Error running query', err);
    console.log(`Connected to PG: ${result.rows[0].theTime}`);

    client.end();
  });
});

module.exports = client;
