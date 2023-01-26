const requestRouter = require('express').Router({ mergeParams: true })
const request = require('../models/request')

requestRouter.get('/', async (req, res) => {
  const binUUID = req.params.uuid
  try {
    const reqList = await request.getRequestsByBinUUID(binUUID)
    if (reqList.length > 0) {
      res.json(reqList)
    } else {
      res.status(404).send()
    }
  } catch (err) {
    console.error(err)
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