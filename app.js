const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const morgan = require("morgan");
// const cors = require("cors");

// Make database connections
require("./db/mongo.js");

app.use(morgan("tiny"));
// app.use(cors());
// app.use(express.static("build"));
// app.use(bodyParser.json());

module.exports = app;
