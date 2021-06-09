const express = require ("express");
const router = express.Router();
//const photosController = require("../controllers/photo");
const indexController = require("../controllers/index");

//Defining endpoints

router.get("/", indexController.home);

router.get("/about", indexController.about);

module.exports = router;
