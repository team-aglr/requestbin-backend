const requestRouter = require('express').Router()
const request = require('../models/request')

requestRouter.get('/', async (req, res) => {
  const binUUID = req.baseUrl.split("/")[3] // we no longer have access to :uuid param
  console.log(binUUID);
  res.send(200)
})

module.exports = requestRouter