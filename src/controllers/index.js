const Photo = require("../models/Photo");
const Tag = require("../models/Tag")

exports.home = (req, res) => {
    res.render("index", {
        allphotos: Photo.getPhotos().sort((a,b) =>new Date(b.date) - new Date(a.date)),
        title: "Pic.to.me Gallery",
        page_name: "home",
        alltags: Tag.getTags()
    });
}

exports.about = (req, res) => {
    res.render("about", {
        title: "Pic.to.me Gallery - About",
        page_name: "about"
    });
}