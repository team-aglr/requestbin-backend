// Listening for requests from webhooks
// Sends the requests to our PG and Mongo databases
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.raw({ type: '*/*' }));

router.all('/*', (req, res) => {
  console.log(req.method) // method
  console.log(req.url) // path (you'll need to split() for the uuid part of the path)
  console.log(req.headers) // headers object (origin should be in here too)
  console.log(req.body.toString()) // body
  res.sendStatus(200);
})

module.exports = router;
