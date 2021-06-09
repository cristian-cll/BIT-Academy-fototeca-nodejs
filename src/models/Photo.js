const { getColorFromURL } = require('color-thief-node');
const Tag = require("../models/Tag");

class Photo {

    static bbddPhotos = [{
        id: 1,
        title: "Camera",
        image: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
        date: "2022-05-28",
        palette: "251,213,220",
        tags: [{
            title: "Pets",
            color: "#964B00" 
        }]
    },{
        id: 2,
        title: "Leon",
        image: "https://prod-discovery.edx-cdn.org/media/course/image/abec5082-2e5f-4702-a767-e99b352d1d63-4ea2cd258b16.small.jpg",
        date: "2022-12-28",
        palette: "23,15,10",
        tags: [{
            title: "Pets",
            color: "#964B00" 
        },{
            title: "Miscellaneous",
            color: "#ff0000"  
        }]
    },{
        id: 3,
        title: "Chrome",
        image: "https://i.blogs.es/594843/chrome/450_1000.jpg",
        date: "2021-05-28",
        palette: "12,92,155",
        tags: [{
            title: "Miscellaneous",
            color: "#ff0000" 
        }]
    },{ 
        id: 4,
        title: "Sunset",
        image: "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/Sunset-900x600.jpeg",
        date: "2023-05-28",
        palette: "213,150,137",
        tags: [{
            title: "Pets",
            color: "#964B00" 
        }]
    }];

    constructor(title, image, date, palette, tags){
        this.title = title,
        this.image = image,
        this.date = date,
        this.palette = palette,
        this.tags = tags
    }

    static getObjectsTag(titleTags){
        let hash = [];
        titleTags.forEach(titleTag => {
            Tag.bbddTags.find(tag => {
                if(tag.title === titleTag){
                     hash.push(tag)
                }
            })
        })
        return hash;
    }

    static async addPhoto(title, image, date, tagsTitle){
        const palette = await Photo.getColorRGB(image);
        const tag = Photo.getObjectsTag(tagsTitle); //Conseguimos el tag objeto
        console.log("object", tag);
        const newPhoto = new Photo(title, image, date, palette, tag);
        console.log("newPhoto", newPhoto);
        newPhoto.id = this.bbddPhotos.length + 1;
        this.bbddPhotos.push(newPhoto);
        console.log("tryyyyyyyyyyyyy",this.bbddPhotos);
    }

    static editPhoto = function(id, title, image, date){
        Photo.bbddPhotos.find(photo =>{ 
            if(photo.id === Number(id)){
                photo.title = title;
                photo.image = image;
                photo.date = date;
            }
        });
    }

    static deletePhoto = function(id){
        return Photo.bbddPhotos.splice(Photo.bbddPhotos.findIndex(photo => photo.id === Number(id)) , 1)
    }

    static searchPhotos = function(title) {
        return Photo.bbddPhotos.filter((photo) => photo.title.toUpperCase().includes(title.toUpperCase()));
    }

    static checkDuplicateUrl = (image) => Photo.bbddPhotos.some(photo => photo.image === image);

    static orderBy = function(by) {
        switch(by){
            case "title": return Photo.bbddPhotos.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
            case "date": return Photo.bbddPhotos.sort((a,b) =>new Date(b.date) - new Date(a.date));
            default: return null;
        }
    }

    static getPhotos = () => Photo.bbddPhotos;

    static async getColorRGB(image){
        const dominantColor = await getColorFromURL(image);
        return dominantColor.toString();
    }
}


module.exports = Photo;