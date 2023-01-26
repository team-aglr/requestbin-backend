const client = require("../db/pg.js");
const Bin = require("./bin.js");

// MongoDB end of requests
const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  requestId: Number,
  binId: Number,
  documentHead: mongoose.Schema.Types.Mixed,
  documentBody: String,
});

const Request = mongoose.model("Request", requestSchema);

// Methods for Request model
async function addRequest(uuid, method, head, body) {
  try {
    const { id: binId } = await Bin.binByUUID(uuid);

    // Insert the request into the "requests" postgres table which links a request to a bin_id
    // The "Returning" keyword gives us back the id of the row we just added in the response
    const request = await client.query(
      "INSERT INTO requests (http_method, bin_id) VALUES ($1, $2) RETURNING id",
      [method, binId]
    );

    // Get the primary key for the requests row that you just added
    const requestId = request.rows[0].id;

    // Create a new request object
    const mongoRequest = new Request({
      requestId,
      binId,
      documentHead: head,
      documentBody: body,
    });
    // Save the request object to mongo
    mongoRequest.save();
    return requestId
  } catch (error) {
    console.log(error);
  }
}

// Get all of the requests for a bin based on its UUID from PG
// Returns array of objects
async function getRequestsByBinUUID(uuid) {
  try {
    const bin = await client.query("SELECT requests.id AS id, http_method, \
      requests.created_at AS created_at, uuid\
      FROM requests JOIN bins ON bin_id = bins.id WHERE uuid = $1", [uuid]);
    return bin.rows;
  } catch (error) {
    console.error(error);
  }
}

// Get the data for one specific webhook request based on its ID from PG and Mongo
// Returns an object
async function getRequestByRequestID(requestId) {
  const requests = await client.query("SELECT * FROM requests WHERE id = $1", [requestId])
  const request = requests.rows[0];

  const { documentHead, documentBody } = await Request.findOne({ requestId });

  request.headers = documentHead;
  request.body = documentBody;
  return request;
}

module.exports = {
  addRequest,
  getRequestsByBinUUID,
  getRequestByRequestID,
};
