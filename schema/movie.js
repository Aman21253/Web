const mongoose=require("mongoose");
const movieSchema=mongoose.Schema({
    id:String,
    title:String,
    description:String,
    actor:String,
    releaseDate:Date,
    genre:{
        type:String,
        enum:['Action','Comedy','Drama','Fantasy','Horror','Romance','SciFi'],
    },
    favourite: {type: Boolean, default: false},
});
const movie=mongoose.model("movie",movieSchema);
module.exports=movie;