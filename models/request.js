/*
Important Notes
· Currently this is using my local version of postgres, which is why its importing localpg.js
· If you want to use the web version, just import pg.js instead
· If you want to use a local version, create a DB on your machine called test_bin with no username or pw, and run the schema.sql document on it
*/

const client = require("../db/localpg.js");
const binService = require("./bin.js");
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  requestId: Number,
  binId: Number,
  documentHead: mongoose.Schema.Types.Mixed,
  documentBody: String,
});

const Request = mongoose.model("Request", requestSchema);

async function addRequest(uuid, method, head, body) {
  try {
    const binId = binService.binByUUID(uuid);

    // Insert the request into the "requests" postgres table which links a request to a bin_id
    // The "Returning" keyword gives us back the id of the row we just added in the response
    const response = await client.query(
      "INSERT INTO requests (http_method, bin_id) VALUES ($1, $2) RETURNING id",
      [method, binId]
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
  const binId = Number(binService.binByUUID(uuid));
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
