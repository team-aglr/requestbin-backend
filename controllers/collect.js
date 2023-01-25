// Listening for requests from webhooks
// Sends the requests to our PG and Mongo databases
Request = require("../models/request");
const { addRequest, getRequestByRequestID } = require("../models/request");
const collectRouter = require("express").Router();
const bodyParser = require("body-parser");
collectRouter.use(bodyParser.raw({ type: "*/*" }));

collectRouter.post("/:uuid", async (req, res) => {
  const head = req.headers;
  const body = req.body.toString();
  const { uuid } = req.params;
  const method = req.method;
  await addRequest(uuid, method, head, body);
  res.sendStatus(200);
});

module.exports = collectRouter;
