// Interfaces with postgres to store bin and request data

// Create a bin using postgres
// Fetch all bins using postgres

const client = require('../db/pg.js');

async function allBins() {
  try {
    const bins = await client.query("SELECT * FROM bins");
    return bins.rows;
  } catch (error) {
    console.error(error);
  }
}

async function newBin() {
  try {
    await client.query("INSERT INTO bins DEFAULT VALUES");
    const newUUID = await client.query("SELECT uuid FROM bins ORDER BY id DESC LIMIT 1");
    return newUUID.rows;
  } catch (error) {
    console.error(error);
  }
}

export default {
  newBin,
  allBins
};

