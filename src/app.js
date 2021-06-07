const express = require("express");
const path = require("path");
const app = express();


//Middleware.
/* Enriquece la peticion del cliente. Si vienen datos de tipo POST
te informa de dichos datos en req.body */
app.use(express.urlencoded({ extended: false}));
app.use(express.static('public'));


//Importing routes 
const photosRoutes = require("./routes/photo");
const indexRoutes = require("./routes/index");

//Using routes from another file
app.use(photosRoutes);
app.use(indexRoutes);

//Settings
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set('port', process.env.PORT || 8080);


//Cualquier otro endpoint, tanto si es GET, POST, PUT o DELETE. Si no cae por ningún otro endpoint, devuelve esto.
app.use((req, res) => {
    res.status(404).render("404", {
        title: "Pic.to.me Gallery - NOT FOUND",
        page_name: "404"
    });
});

app.use(function(err, req, res, next) {
    console.error("error", err.stack);
    res.status(500).send('Something broke!');
});
  


app.listen(app.get('port'));