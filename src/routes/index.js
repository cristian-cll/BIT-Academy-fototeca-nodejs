const express = require ("express");
const router = express.Router();
const photosController = require("../controllers/photo");

//Defining endpoints

router.get("/", photosController.getAllPhotos);

router.get("/about", photosController.about);

module.exports = router;
