require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  database: process.env.PSQL_DB_NAME,
});

async function query(text, params) {
  return await pool.query(text, params);
}

const client = {
  query,
};

module.exports = client;
