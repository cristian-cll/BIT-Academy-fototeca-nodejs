const Tag = require("../models/Tag");

exports.addTag = (req, res) => {
    const titleTag = req.body.titleTag;
    const colorTag = req.body.colorTag;
    
    Tag.addTag(titleTag, colorTag);
    res.redirect("/");
}