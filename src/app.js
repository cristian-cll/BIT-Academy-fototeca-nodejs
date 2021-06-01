const express = require("express");
const path = require("path");
const app = express();


//Middleware.
/* Enriquece la peticion del cliente. Si vienen datos de tipo POST
te informa de dichos datos en req.body */
app.use(express.urlencoded({ extended: false}));
app.use(express.static('public'));


//Importing routes 
const indexRoutes = require("./routes/index");

//Using routes from another file
app.use("/", indexRoutes);

//Settings

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.listen(3000);