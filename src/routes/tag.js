const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tag");

router.post("/new-tag", tagsController.addTag)

module.exports = router;