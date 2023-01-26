const requestRouter = require('express').Router({ mergeParams: true })
const request = require('../models/request')
const bin = require('../models/bin')

requestRouter.get('/', async (req, res) => {
  const binUUID = req.params.uuid
  let valid = await bin.validUUID(binUUID)
  if (valid) {
    try {
      const reqList = await request.getRequestsByBinUUID(binUUID)
      res.json(reqList)
    } catch (err) {
      console.error(err)
    }
  } else {
    res.status(404).send()
  }
})

requestRouter.get('/:id', async (req, res) => {
  try {
    const reqObj = await request.getRequestByRequestID(req.params.id)
    res.json(reqObj)
  } catch (err) {
    console.error(err)
    res.status(404).send()
  }
})

module.exports = requestRouter