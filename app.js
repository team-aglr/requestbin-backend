const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const connectMongo = require("./db/mongo.js");

app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("build"));
app.use(bodyParser.json());
connectMongo();

module.exports = app;
