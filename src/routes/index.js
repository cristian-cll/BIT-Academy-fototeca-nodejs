const express = require ("express");
const router = express.Router();
const database = require("../models/database");

//Defining endpoints

router.get("/", (req, res) => {
    res.render("index", {
        allphotos: database.getPhotos(),
        title: "Pic.to.me Gallery",
        page_name: "home"
    });
});



router.post("/add", async (req, res)=>{

    const photoTitle = req.body.title; 
    const photoUrl = req.body.url; 
    const photoDate = req.body.date; 
    
    if(database.checkDuplicateUrl(photoUrl)){
        return res.render("addimage", {
            error: true,
            url: photoUrl
        });
    }

    await database.addPhoto(photoTitle, photoUrl, photoDate);

    res.redirect("/");
});



router.get("/delete/:id", (req, res) => {
    const { id } = req.params; //Podemos obtener el valor id del objeto req.params.
    database.deletePhoto(id);
    res.redirect("/");
});


router.post("/edit/:id", (req, res) => {

    const photoTitle = req.body.title; 
    const photoUrl = req.body.url; 
    const photoDate = req.body.date; 
    const id = req.params.id; //De esta forma obtenemos también el id de forma directa al objeto.

    database.editPhoto(id, photoTitle, photoUrl, photoDate);
    res.redirect("/");
});


router.get("/checkphoto/", (req, res) => {
    const url = req.query.photoURL;
    console.log(url);
    
    let isDuplicateUrl = database.checkDuplicateUrl(url)

    res.json({
        error: isDuplicateUrl,
        url: url 
    })
});


router.get("/about", (req, res) => {
    res.render("about", {
        title: "Pic.to.me Gallery - About",
        page_name: "about"
    });
});


//Cualquier otro enpoint, tanto si es GET, POST, PUT o DELETE. Si no cae por ningún otro endpoint, devuelve esto.
router.use((req, res) => {
    res.status(404).render("404");
});


module.exports = router;
