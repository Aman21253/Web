//express ko require ke liye
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");

//random id ke liye
const { v4: uuidv4 } = require("uuid");
//apn template mein sirf get and post req bhejte h toh override ke liye
const methodoverride=require("method-override");

//views ke andr ejs file use ke liye
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
//jb koi data parse krna ho dusri file se
app.use(express.urlencoded({extended:true}));

const Movie=require("/Users/amanbansal/stagelist2/schema/movie.js");
//const { release } = require("os");

main().then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/myList');
}

//For accessing data
//Iss se sari movie ki list show ho rhi h
app.get("/movie",async(req,res)=>{
    let movies=await Movie.find();
    //console.log(movies);
    res.render("movie.ejs",{movies});
});
app.post("/movie",async(req,res)=>{
    let { title,description,actor,genre }=req.body;
    let newMovie=new Movie({
        id:uuidv4(),
        title,description,actor,genre,
        releaseDate:new Date(),
    });
    await newMovie.save()
    .then((req,res)=>{
        console.log("Chat saved");
    }).catch((err)=>{
        console.log(err);
    });
    res.redirect("/movie");
});
//Add new movies
app.get("/movie/newMovie",async(req,res)=>{
    // let movies=await Movie.find();
    return res.render("newMovie.ejs");
});
//Add fav
app.post("/movie/fav/:_id",async(req,res)=>{
    let { _id }=req.params;

    let updatedMovie=await Movie.findByIdAndUpdate(_id,{$set: {favourite:true}},{new:true});
    console.log({_id, updatedMovie})
    const favouriteMovies = await Movie.find({favourite: true});
    // console.log({favouriteMovies});
    return res.render("fav.ejs",{favouriteMovies});
});
//Remove to fav but its not working
app.post("/movie/fav/:_id", async (req, res) => {
    const { _id } = req.params;
    let updatedMovie = await Movie.findByIdAndDelete(_id,{$set: { favourite: false }}, { new: true });
    console.log({_id, updatedMovie})
    const favouriteMovies = await Movie.find({favourite: false});
    // console.log({favouriteMovies});
    res.redirect("/movie/fav/:_id");
});

app.get("/",(req,res)=>{
    res.send("Work");
});

app.get('*',(req,res)=>{
    res.render("404.ejs");
});

app.listen(8080,()=>{
    console.log("Successful at 8080");
});