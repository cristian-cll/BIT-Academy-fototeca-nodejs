
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
    image: "https://www.wnpower.com/blog/wp-content/uploads/sites/3/2020/02/tama%C3%B1o-imagen-instagram-redes-sociales.jpg",
    date: "2022-05-28"
},{
    id: 2,
    title: "Example2",
    image: "https://disenowebakus.net/imagenes/articulos/html5.jpg",
    date: "2022-05-28"
},{
    id: 3,
    title: "Example3",
    image: "https://i.blogs.es/594843/chrome/450_1000.jpg",
    date: "2022-05-28"
},{ 
    id: 4,
    title: "Example4",
    image: "https://www.teknofilo.com/wp-content/uploads/2020/03/whatsapp-1280x720.jpg",
    date: "2023-05-28"
}];



const { getColorFromURL } = require('color-thief-node');

let getColor = async function(url){
    const dominantColor = await getColorFromURL(url);
    console.log(dominantColor)
    return dominantColor;
};
 



exports.addPhoto = function(title, image, date){

    let photoFound = photos.find(photo => photo.image == image);

    console.log(photoFound);
    if(!photoFound){
        console.log("aqui entra");
        return photos.push(new Photo(title, image, date));
    }
    return false;
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





