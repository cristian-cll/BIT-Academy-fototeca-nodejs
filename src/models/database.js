class Photo {
    constructor(title, image, date, palette){
        this.title = title;
        this.image = image;
        this.date = date;
        this.palette = palette
    }
}

let photos = [{
    id: 1,
    title: "Camera",
    image: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
    date: "2022-05-28",
    palette: "251,213,220"
},{
    id: 2,
    title: "Extract",
    image: "https://www.eluniversal.com.mx/sites/default/files/2020/03/19/como_extraer_un_texto_de_una_imagen.jpg",
    date: "2022-12-28",
    palette: "164,226,250"
},{
    id: 3,
    title: "Ojo",
    image: "https://static1.diariosur.es/www/multimedia/201909/30/media/cortadas/imagensensible-kYzD-U90285421336FWD-624x385@Diario%20Sur.jpg",
    date: "2021-05-28",
    palette: "58,50,36"
},{ 
    id: 4,
    title: "Sunset",
    image: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg",
    date: "2023-05-28",
    palette: "213,150,137"
}];


const { getColorFromURL } = require('color-thief-node');

async function getColorRGB (image){
    const dominantColor = await getColorFromURL(image);
    return dominantColor.toString();
}


exports.getPhotos = () => photos;

exports.getColorRGB = getColorRGB;

exports.checkDuplicateUrl = (image) => photos.some(photo => photo.image === image);

exports.addPhoto = async function(title, image, date){
    const palette = await getColorRGB(image);
    const newPhoto = new Photo(title, image, date, palette);
    newPhoto.id = photos.length + 1;
    photos.push(newPhoto);
};

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

exports.searchPhotos = function(title) {
    return photos.filter((photo) => photo.title.toUpperCase().includes(title.toUpperCase()));
}

exports.orderBy = function(by) {

    switch(by){
        case "title": return photos.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
        case "date": return photos.sort((a,b) =>new Date(b.date) - new Date(a.date));
        default: return null;
    }
}