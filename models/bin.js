// Interfaces with postgres to store bin and request data

// Create a bin using postgres
// Fetch all bins using postgres

const client = require("../db/pg.js");

async function allBins() {
  try {
    const bins = await client.query(
      "SELECT * FROM bins ORDER BY created_at DESC"
    );
    return bins.rows;
  } catch (error) {
    console.error(error);
  }
}

async function binByUUID(id) {
  try {
    const bin = await client.query("SELECT id FROM bins WHERE uuid = $1", [id]);
    return bin.rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function newBin() {
  try {
    const newUUID = await client.query(
      "INSERT INTO bins DEFAULT VALUES RETURNING id, uuid, created_at"
    );
    return newUUID.rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function validUUID(uuid) {
  if (!(typeof uuid === "string" && uuid.length === 8)) {
    return false;
  }

  const exists = await client.query(
    "SELECT EXISTS (SELECT 1 FROM bins WHERE uuid = $1 LIMIT 1);",
    [uuid]
  );
  return exists.rows[0].exists;
}

const Bin = {
  newBin,
  binByUUID,
  allBins,
  validUUID,
};

module.exports = Bin;
