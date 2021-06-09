class Tag {

    static bbddTags = [{
        title: "Miscellaneous",
        color: "#ff0000" 
    },
    {
        title: "Pets",
        color: "#964B00"   
    }]
    constructor(title, color){
        this.title = title,
        this.color = color
    }

    static addTag = function(title, color){
        const newTag = new Tag(title, color);
        this.bbddTags.push(newTag);
        console.log("Datos Tags", this.bbddTags);
    }

    static getTags = () =>{
        return this.bbddTags;
    }
}

module.exports = Tag;