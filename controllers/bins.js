// Creating a new bin & displaying all bins

const Bin = require('../models/bin.js');
const requestModel = require('../models/request')

const express = require('express');
const router =  express.Router();

router.get("/", async(request, response) => {
  try {
    const bins = await Bin.all();
    response.status(200).json(bins);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async(request, response) => {
  try {
    const newUUID = await Bin.createNew();
    response.status(200).json(newUUID);
  } catch (error) {
    response.status(500).send(error)
  }
});

router.delete("/:id", async(request, response) => {
  const binId = request.params.id
  try {
    await binModel.deleteBin(binId)
    await requestModel.deleteAllPerBin(binId)
    response.status(204).send()
  } catch (error) {
    console.log(error)
    response.status(500).send(error)
  }
})

module.exports = router;