
class Photo {
    constructor(title, image, date, palette){
        this.id = Photo.incrementId();
        this.title = title;
        this.image = image;
        this.date = date;
        this.palette = palette
    }
    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }
}

let photos = [{
    id: 1,
    title: "Example",
    image: "http://www.silocreativo.com/wp-content/uploads/2020/07/ocultar-imagen-destacada-wordpress.png",
    date: "2022-05-28",
    palette: "251,213,220"
},{
    id: 2,
    title: "Example2",
    image: "https://disenowebakus.net/imagenes/articulos/html5.jpg",
    date: "2022-05-28",
    palette: "236,97,39"
},{
    id: 3,
    title: "Example3",
    image: "https://i.blogs.es/594843/chrome/450_1000.jpg",
    date: "2022-05-28",
    palette: "12,92,155"
},{ 
    id: 4,
    title: "Example4",
    image: "https://www.teknofilo.com/wp-content/uploads/2020/03/whatsapp-1280x720.jpg",
    date: "2023-05-28",
    palette: "147,219,115"
},{
    id: 5,
    title: "Homer",
    image: "https://3.bp.blogspot.com/-JfL1o7oSnKI/VmodObHF9cI/AAAAAAAABLY/nKKRXw0-yiU/s1600/homero_456_336.jpg",
    date: "2023-05-28",
    palette: "66,138,212"
}];


//let image = "https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen.jpg";
const { getColorFromURL } = require('color-thief-node');

 
async function getColorRGB(image){
    const dominantColor = await getColorFromURL(image);
    return dominantColor.toString();
}
 
//color(image).then(console.log)


exports.checkDuplicateUrl = (image) => photos.some(photo => photo.image === image);

exports.addPhoto = function(title, image, date){
    getColorRGB(image).then(palette => photos.push(new Photo(title, image, date, palette)))
};


exports.getPhotos = () => photos.sort((a, b) =>{ return new Date(b.date) - new Date(a.date)});
//We export the photos array and sort by most recent date. We have to parse the string to a date format.

exports.deletePhoto = function(id){
    return photos.splice( photos.findIndex(photo => photo.id === Number(id)) , 1)
}

exports.editPhoto = function(id, title, image, date){
    photos.find(photo =>{ 
        if(photo.id === Number(id)){
            photo.title = title;
            photo.image = image;
            photo.date = date;
        }
    });
};