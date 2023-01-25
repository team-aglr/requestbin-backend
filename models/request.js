/*
Important Notes
· Currently this is using my local version of postgres, which is why its importing localpg.js
· If you want to use the web version, just import pg.js instead
· If you want to use a local version, create a DB on your machine called test_bin with no username or pw, and run the schema.sql document on it
*/

const client = require("../db/localpg.js");
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  requestId: Number,
  binId: Number,
  documentHead: mongoose.Schema.Types.Mixed,
  documentBody: String,
});

const Request = mongoose.model("Request", requestSchema);

async function getBinFromUUID(uuid) {
  try {
    // check if the uuid is in the correct format
    if (
      !uuid.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      )
    ) {
      throw new Error("Invalid UUID format");
    }
    // Get the ID of the bin (i.e. the private key) based on its uuid
    const response = await client.query("SELECT id FROM bins WHERE uuid = $1", [
      uuid,
    ]);
    if (response.rows.length === 0) {
      throw new Error("UUID not found in the database");
    }
    binId = response.rows[0].id;
    return binId;
    // Write to the postgres database
  } catch (error) {
    console.log(error);
  }
}

async function addRequest(uuid, method, head, body) {
  try {
    const binId = await getBinFromUUID(uuid);
    const timestamp = new Date().toISOString();
    // Insert the request into the "requests" postgres table which links a request to a bin_id
    // The "Returning" keyword gives us back the id of the row we just added in the response
    const response = await client.query(
      "INSERT INTO requests (http_method, timestamp, bin_id) VALUES ($1, $2, $3) RETURNING id",
      [method, timestamp, binId]
    );
    // Get the primary key for the requests row that you just added
    const requestId = response.rows[0].id;
    // Create a new request object
    const request = new Request({
      requestId,
      binId,
      documentHead: head,
      documentBody: body,
    });
    // Save the request object to mongo
    request.save();
  } catch (error) {
    console.log(error);
  }
}

// Get all of the requests for a bin based on its UUID
async function getRequestsByBinUUID(uuid) {
  const binId = await getBinFromUUID(uuid);
  const requests = await Request.find({ binId });
  return requests;
}

// Get the data for one specific webhook request based on its ID
async function getRequestByRequestID(requestId) {
  const request = await Request.findOne({ requestId });
  return request;
}

module.exports = {
  addRequest,
  getRequestsByBinUUID,
  getRequestByRequestID,
};
