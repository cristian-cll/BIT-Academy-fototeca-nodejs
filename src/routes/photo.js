const express = require ("express");
const router = express.Router();
const photosController = require("../controllers/photo");

//Defining endpoints

router.get("/", photosController.getAllPhotos);

router.post("/add", photosController.addPhoto);

router.get("/delete/:id", photosController.deletePhoto);

router.post("/edit/:id", photosController.editPhoto);

router.get("/checkphoto/", photosController.checkPhoto);

router.get("/search/", photosController.searchPhoto);

router.get("/order/", photosController.orderPhoto);

router.get("/about", photosController.about);


module.exports = router;