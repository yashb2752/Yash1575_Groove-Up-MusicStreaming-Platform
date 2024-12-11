/* to get started with the backend
    - npm init  (get started with the backend)
    - npm install express or npm i express (install express node modules)
    - import express package into ur index.js
    - lets create an app of this express package

    - using this app variable we can make 2 types of API's .get() and .post() 
    - lets create a get() api using app, .get() has 2 arguments , note : app.get(route on which server will run, respond
    - on / route lets display text "This is Yashasvi's server" using res.send()
    - to set the localhost:PORT u need to use app.listen(Port no, what to perform)

*/

const express = require("express");  // import express package
const app = express();   // create app from express
const mongoose = require("mongoose"); // require mongoose into project
require('dotenv').config() // include .env into project TO access password

const JwtStrategy = require('passport-jwt').Strategy, // for passport-jwt
    ExtractJwt = require('passport-jwt').ExtractJwt; 
const passport = require("passport");

const User = require("./models/User.js"); // fetch User model
const cors = require("cors");  // used to bypass the security policy so that anyone can access this site

const bodyParser = require("body-parser"); // npm i body-parser  // very imp for using req.body

const authRoutes = require("./Routes/auth.js");
const songRoutes = require("./Routes/song.js");
const playlistRoutes = require("./Routes/playlist.js");

// Use body-parser middleware to parse JSON and urlencoded request bodies
app.use(bodyParser.json());    // imp for using req.body
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()); // this way we bypass the security and anyone can access the site 
app.use(express.json());   // so that every data that express package gets (like email, pass, ..) will be converted to JSON  

// const PORT = 8080;
const PORT = 8080;

mongoose.connect(
    // `mongodb+srv://yashasviyadav:llgmCVZ37TEQM1qB@cluster0.c5n5f2b.mongodb.net/?retryWrites=true&w=majority` ,
    `mongodb+srv://yashasviyadav:${process.env.MONGO_PASSWORD}@cluster0.c5n5f2b.mongodb.net/?retryWrites=true&w=majority` ,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } 
).then((x) => {
    console.log("Mongo Db connected successfully");
}).catch((error) =>{
    console.log("mongo db connection ERROR " + error);
})

// ---> set up passport-jwt for authenticating users

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_JWT_SECRETKEY;  // better to use from env variable (.env)
// opts.issuer = 'accounts.examplesoft.com';   // these 2 are not mandotary lines 
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    // // User.findOne({id: jwt_payload.sub}, function(err, user) {  //with this, all songs from all the diff users will be created under single user only (and this is an issue)
    //     User.findOne({_id: jwt_payload.identifier}, function(err, user) {  // this will fix the above issue, each different songs by diff users will be listed under their individual 'mySongs' route only

    //     // in login
    //     // done(error, isUserExists)

    //     if (err) {   // if error found, then 'jwt tocken not matched', try to login again
    //         return done(err, false);
    //     }
    //     if (user) {  // user found, jwt matched, user logged in 
    //         return done(null, user);
    //     } else {
    //         return done(null, false);  // no error, no user, so create new account
    //         // or you could create a new account
    //     }
    // });
    try{
        const user = await User.findOne({_id: jwt_payload.identifier});

        // in login
        // done(error, isUserExists)
        if(user){
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }catch(error){
        return done(error, false);
    }
})); 

// defining a route 
app.get("/", (req, res) => {  // if we use '/home' then server will run there
    // res.send("Hello World");
    res.send("This is GrooveUp music app backend !");
})

app.use('/auth', authRoutes);
app.use('/song', songRoutes); // means whenever use hits '/song' route then call the songRoute.js
app.use('/playlist', playlistRoutes); 

app.get('/test', (req, res) => {// for postman testing purpose
    console.log("Hello ur ./test route is working fine");
    res.send('Hello, this is get ./test endpoint!');
});

app.post('/testing', (req, res) => {    // for postman testing purpose
    res.send("/testing endpoint is working fine");
    console.log("/testing endpoint is working fine -- console");
})

// starting server at desired port
app.listen(PORT, () => { 
    console.log("server running at port " + PORT);
})


// "mongoose": "^8.0.2",  // original mongoose version that i removed

