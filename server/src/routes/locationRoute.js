const express = require("express");
const router = express.Router();
const locationController = require("../controllers/locationController");

router.post("/addlocation", locationController.createLocation);

module.exports = router;
