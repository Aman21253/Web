const mongoose = require("mongoose");
const Movie = require("/Users/amanbansal/stagelist2/schema/movie.js");
const {v4:uuidv4}=require("uuid");

main()
  .then(() => {
    console.log("connection successful");
    // After successful connection, insert movie documents
    return insertMovies();
  })
  .catch(err => console.log(err)); 

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/myList');
}

async function insertMovies() {
    let movies = [
      {
        id: uuidv4(),
        title: "KGF",
        description: "It is an action movie. It is related to gold",
        actor: "Yash",
        genre: 'Action', // Changed "genere" to "genre"
        releaseDate: new Date(),
      }
    ];

    await Movie.insertMany(movies);
    console.log("Movies inserted successfully.");
};