const express = require ("express");
const router = express.Router();
const database = require("../models/database");

//Defining endpoints

router.get("/", (req, res) => {
    res.render("index", {
        allphotos: database.getPhotos(),
    });
});

router.get("/add", (req, res) => {
    res.render("addimage",{
        error: false
    });
});



/* router.post("/add", (req, res)=>{

    const photoTitle = req.body.title; 
    const photoUrl = req.body.url; 
    const photoDate = req.body.date; 
    
    
    if(database.checkDuplicateUrl(photoUrl)){
        return res.render("addimage", {
            error: true,
            url: photoUrl
        });
    }

    database.addPhoto(photoTitle, photoUrl, photoDate)
    
  
    res.redirect("/");
});
 */

router.post("/add", (req, res)=>{

    const photoTitle = req.body.title; 
    const photoUrl = req.body.url; 
    const photoDate = req.body.date; 
    
    
    if(database.checkDuplicateUrl(photoUrl)){
        return res.render("addimage", {
            error: true,
            url: photoUrl
        });
    }

    database.addPhoto(photoTitle, photoUrl, photoDate);

    res.redirect("/");
    
  
   
});



router.get("/delete/:id", async (req, res) => {
    const { id } = req.params; //Podemos obtener el valor id del objeto req.params.
    await database.deletePhoto(id);
    res.redirect("/");
});


router.post("/edit/:id", async (req, res) => {

    const photoTitle = req.body.title; 
    const photoUrl = req.body.url; 
    const photoDate = req.body.date; 
    const id = req.params.id; //De esta forma obtenemos también el id de forma directa al objeto.

    await database.editPhoto(id, photoTitle, photoUrl, photoDate);
    res.redirect("/");
});


router.post("/your/", function (req, res) {
    const show_modal = !!req.body.modal; // Cast to boolean
    res.render("index", { show_modal }); //Pasamos el boleano
});




//Cualquier otro enpoint, tanto si es GET, POST, PUT o DELETE. Si no cae por ningún otro endpoint, devuelve esto.
router.use((req, res) => {
    res.status(404).render("404");
});


module.exports = router;
