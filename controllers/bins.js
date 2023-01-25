// Creating a new bin & displaying all bins

const binModel = require('../models/bin.js');
const express = require('express');
const router =  require("express").Router();

router.get("/api/bins", (request, response) => {
  try {
    const bins = binModel.allBins();
    response.status(200).json(bins);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/api/bins", (request, response) => {
  try {
    const newUUID = binModel.newBin().uuid;
    response.status(200).send(newUUID);
  } catch (error) {
    response.status(500).send(error)
  }
});

module.exports = router;