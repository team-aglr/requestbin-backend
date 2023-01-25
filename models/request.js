// Interfaces with mongo to create and pull requests

// Display all requests pertaining to a bin
// Displaying specific request data using the mongo connection

const mongoose = require("mongoose");

// Request ID is generated in postgres and supplied to Mongo
const requestSchema = new mongoose.Schema({
  requestId: Integer,
  binId: Integer,
  document: String,
});

// userSchema.set("toJSON", {
//   transform: (_, returnedObject) => {
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
