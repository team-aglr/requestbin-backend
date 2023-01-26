// Creating a new bin & displaying all bins

const binModel = require('../models/bin.js');
const express = require('express');
const router =  express.Router();

router.get("/", (request, response) => {
  try {
    const bins = await binModel.allBins();
    response.status(200).json(bins);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", (request, response) => {
  try {
    const newUUID = await binModel.newBin().uuid;
    response.status(200).send(newUUID);
  } catch (error) {
    response.status(500).send(error)
  }
});

module.exports = router;