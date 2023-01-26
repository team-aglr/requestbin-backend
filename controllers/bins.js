// Creating a new bin & displaying all bins

const Bin = require('../models/bin.js');
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

module.exports = router;