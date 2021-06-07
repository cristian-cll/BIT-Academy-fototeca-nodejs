const Photo = require("../models/Photo");

exports.getAllPhotos = (req, res) => {
    res.render("index", {
        allphotos: Photo.getPhotos().sort((a,b) =>new Date(b.date) - new Date(a.date)),
        title: "Pic.to.me Gallery",
        page_name: "home"
    });
}

exports.addPhoto =  async (req, res)=>{
    const photoTitle = req.body.title; 
    const photoUrl = req.body.url; 
    const photoDate = req.body.date; 
    
    if(Photo.checkDuplicateUrl(photoUrl)){
        return res.redirect("/");;
    }
    await Photo.addPhoto(photoTitle, photoUrl, photoDate);
    res.redirect("/");
}

exports.deletePhoto = (req, res) => {
    const { id } = req.params; //Podemos obtener el valor id del objeto req.params.
    Photo.deletePhoto(id);
    res.redirect("/");
}

exports.editPhoto = (req, res) => {
    const photoTitle = req.body.title; 
    const photoUrl = req.body.url; 
    const photoDate = req.body.date; 
    const id = req.params.id; //De esta forma obtenemos también el id de forma directa al objeto.

    Photo.editPhoto(id, photoTitle, photoUrl, photoDate);
    res.redirect("/");
}

exports.checkPhoto = async (req, res) => {
    const url = req.query.photoURL;

    let isDuplicateUrl = Photo.checkDuplicateUrl(url)
    try{
        await Photo.getColorRGB(url)
    }
    catch(error){
        return res.json({
            error: true,
            errorText: "No es una url o Photo válida. Solo formatos .jpg .gif .png"
        })
    }
    res.json({
        error: isDuplicateUrl,
        errorText: `La url ${url} ya existe`,
    })
}

exports.searchPhoto = (req, res) => {
    const title = req.query.title;
    const search = Photo.searchPhotos(title)

    res.render("index", {
        allphotos: search,
        title: "Pic.to.me Gallery - Results",
        page_name: "results"
    });
}

exports.orderPhoto = (req, res) => {
    let by = req.query.by;
    let sortedPhotos = Photo.orderBy(by);

    if(sortedPhotos == null) {
        return res.redirect("/");
    }
     res.render("index", {
        allphotos: sortedPhotos,
        title: "Pic.to.me Gallery",
        page_name: "home"
    }); 
}

exports.about = (req, res) => {
    res.render("about", {
        title: "Pic.to.me Gallery - About",
        page_name: "about"
    });
}