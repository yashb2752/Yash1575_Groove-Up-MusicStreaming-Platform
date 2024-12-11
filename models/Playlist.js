
// creating a model
// step1 : required mongoose
// step2 : using mongoose create schema
// step3 : create and export model

const mongoose = require("mongoose"); // step1 

const Playlist = new mongoose.Schema({ // step2 

    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    owner:{
        type: mongoose.Types.ObjectId,
        ref:"User",
    },
    songs: [  // note: [] means array of songs, see playlist will have songs, and each song will have all properties of song Model i.e Name,Thumbnail,track,artist
        {
            type: mongoose.Types.ObjectId,  //imp: here again each song will have property of song model, so why to create it again, lets use its id 
            ref: "Song", 
        }
    ],
    collaborators: [ // array of collaborators i.e users
        {
            type: mongoose.Types.ObjectId,
            ref: "User", 
        }
    ]

    // playlist me songs konge h
    // playlist collaborators
}) 

// step3
const PlaylistModel = new mongoose.model("Playlist", Playlist); // create a Playlist model named 'Playlist' with 'Playlist' schema

module.exports = PlaylistModel;


