// Interfaces with postgres to store bin and request data

// Create a bin using postgres
// Fetch all bins using postgres

const client = require("../db/pg.js");

async function all() {
  try {
    const query = `SELECT bins.id, bins.uuid, 
                          bins.created_at, 
                          MAX(requests.created_at) AS most_recent_request_date 
  		   FROM bins 
  		     LEFT JOIN requests ON bins.id = bin_id 
 		     GROUP BY bins.id 
                     ORDER BY most_recent_request_date DESC NULLS LAST`;

    const bins = await client.query(query);
    return bins.rows;
  } catch (error) {
    console.error(error);
  }
}

async function findByUUID(id) {
  try {
    const bin = await client.query("SELECT id FROM bins WHERE uuid = $1", [id]);
    return bin.rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function createNew() {
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

async function deleteBin(id) {
  try {
    await client.query("DELETE FROM bins WHERE id = $1", [id]);
  } catch (error) {
    console.log(error);
  }
}

const Bin = {
  createNew,
  findByUUID,
  all,
  validUUID,
  deleteBin
};

module.exports = Bin;
