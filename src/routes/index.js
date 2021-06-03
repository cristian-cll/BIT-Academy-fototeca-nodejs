const express = require ("express");
const router = express.Router();
const database = require("../models/database");

//Defining endpoints

router.get("/", (req, res) => {
    res.render("index", {
        allphotos: database.getPhotos().sort((a,b) =>new Date(b.date) - new Date(a.date)),
        title: "Pic.to.me Gallery",
        page_name: "home"
    });
});


router.post("/add", async (req, res)=>{
    const photoTitle = req.body.title; 
    const photoUrl = req.body.url; 
    const photoDate = req.body.date; 
    
    if(database.checkDuplicateUrl(photoUrl)){
        return res.redirect("/");;
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


router.get("/checkphoto/", async (req, res) => {
    const url = req.query.photoURL;

    let isDuplicateUrl = database.checkDuplicateUrl(url)
    try{
        await database.getColorRGB(url)
    }
    catch(error){
        return res.json({
            error: true,
            errorText: "No es una url o imagen válida. Solo formatos .jpg .gif .png"
        })
    }
    res.json({
        error: isDuplicateUrl,
        errorText: `La url ${url} ya existe`,
    })
});


router.get("/search/", (req, res) => {
    const title = req.query.title;
    const search = database.searchPhotos(title)

    res.render("index", {
        allphotos: search,
        title: "Pic.to.me Gallery - Results",
        page_name: "results"
    });
});

router.get("/order/", (req, res) => {
    let by = req.query.by;
    let sortedPhotos = database.orderBy(by);

    if(sortedPhotos == null) {
        return res.redirect("/");
    }
     res.render("index", {
        allphotos: sortedPhotos,
        title: "Pic.to.me Gallery",
        page_name: "home"
    }); 
});


router.get("/about", (req, res) => {
    res.render("about", {
        title: "Pic.to.me Gallery - About",
        page_name: "about"
    });
});


module.exports = router;