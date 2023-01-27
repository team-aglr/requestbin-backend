// Listening for requests from webhooks
// Sends the requests to our PG and Mongo databases
const { addRequest } = require("../models/request");
const collectRouter = require("express").Router();
const bodyParser = require("body-parser");
collectRouter.use(bodyParser.raw({ type: "*/*" }));

// We might want to add paths to the request object later
collectRouter.all("/:uuid", async (req, res) => {
  const head = req.headers;

  let body;
  if (Object.keys(req.body).length == 0) {
    body = "";
  } else if (req.headers['content-type'].includes('application/json')) {
    body = JSON.stringify(JSON.parse(req.body), null, 2);
  } else {
    body = decodeURIComponent(req.body.toString());
  }

  const { uuid } = req.params;
  const method = req.method;
  await addRequest(uuid, method, head, body);
  res.sendStatus(200);
});

module.exports = collectRouter;
