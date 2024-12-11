
// creating a model
// step1 : required moongose
// step2 : using moongose create schema
// step3 : create and export model

const mongoose = require("mongoose"); // step1 

const Song = new mongoose.Schema({ // step2 

    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,  // will store a link to image and link is string
        required: true,
    },
    track: {
        type: String, // will try to store a link to image and link is string
        required: true,
    },
    artist: {
        type: mongoose.Types.ObjectId, // whenever a user is created an id is also associated with that user, so since a artist is also a user who will have a email, name etc, so it will have an id as well so we use that id of user (thats why we give ref:user)
        // ref: "User",  
        ref: "User",  
    }, 
}) 

// step3
const SongModel = new mongoose.model("Song", Song); // create a song model named 'Song' with 'Song' schema

module.exports = SongModel;


