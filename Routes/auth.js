
const express = require("express");
// now we could import app from express() but it has a lot of functions like app.get(), app.post(), ... and we only need the Router method from the express so lets only import that for efficiency
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {getToken} = require("../utils/helpers");

// /auth/register route 
router.post("/register", async (req, res) => {  // working fine ✔️

    // this func will run when the /register API is called as post request
    //step 1 : fetch user data from req.body note : while printing we used res.send() because we were giving something, here we want the details from user, whicch we get from 'req.body'
    const {email, password, firstName, lastName, username} = req.body; // note : we did not add password in UserSchema in User.js model because of security reasons

    // console.log("reached /register/auth.js line 20"); // TESTING PURPOSE

    // s-2 : if user with this emaill exists, throw error (coz this is signup route), for this we use User.findOne() to find a User from Users
    // User. method are used with `await`, and because we used await the callback function is always `async`
    const user = await User.findOne({email: email}); // first email means email of user, second email is the email we defines above

    if(user){ // email match was found, user already exists
        
        return res.status(403).json({err: "a user with this email already exists."}) // we used res.send() to send a string on our server, but if we want to send in key,value pair, then use JSON, also status(200) means something is accepted, but since its an error we use status(402) - convention
    }

    // step3 : user did not exists - create new user in DB
    // step3.1 : never store pass in db in plane text, coz if db hacked all users pass are leaked, so for security reasons, and trust always bcrypt() the data in hash, pass can be converted to hash, hash can never be converted to pass again
    const hashedPassword = await bcrypt.hash(password, 10); // install `npm i bycrypt' and require then this 10 will convert pass into hash of length 10

    const newUserData = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        username
    }; 

    const newUser = await User.create(newUserData)

    // step4 : now our user is created, but since our project is using JWT for tockens, we need to create a tocken and send it to db along with the new User Created, so that whenever user logs in again the tocken is matched
    const token = await getToken(email, newUser);  // from the getToken() defined in ../utils/helper.js
     
    // step5 : store newUser in JSON and its token together and then send it, make sure to delete its hashed password, coz its tocken is generated (for security reasons)
    const userToReturn = {...newUser.toJSON(), token};   //... is spread operator means copy all valued of newUser.toJSON() into the 'userToReturn' 
    
    // delete userToReturn.password; 
    // console.log(userToReturn);   // this line is removable, its just for error Testing purpose 

    return res.status(200).json(userToReturn); // 200 means work is done  (by deafault status:200)

});


//    /auth/login route
router.post("/login", async (req, res) => {

    // step1 : get email, password from user
    const {email, password} = req.body;

    // step2 : check if a user with this email already exists
    const user = await User.findOne({email: email});   

    // step3 : if user does not exists, then return "Invalid credentials" and status 403
    if(!user){
        return res.status(403).json({err: "Invalid Credentials"});
    }

    // step4 : reached here means user exists, but password has not been checked yet, but if you remember inside the /register route we have stored the user with 'hashedPassword' inside the data base, but just now inside req.body we got the password in plain text, so how can we compare this?
    // we can not convert hashed pass to original password, but we can convert the org pass to hashed pass again, but to make sure that if plain text password is same then 'hashedPass' should also be same i.e for a password 'hiiampass' hashed code should always be '13#58392skadj' , we can achieve this if we set the 2 parameters of 'hashing' as fix, and which is automatically done by 'bcrypt' , all we have to do is compare
    
    // console.log(user);  // For Error testing purpose 
    // console.log(user.password);

    const isPasswordValid = await bcrypt.compare(password, user.password);  // if u have error in this line means we are not able to fetch the password of user
         
    // step5 : pass is not mathed, then return 403 status
    if(!isPasswordValid){
        return res.status(403).json({err: "Invalid Credentials"});
    }

    // step6 : pass is matched, so create a tocken for user and send it with the user
    const token = await getToken(user.email, user);
    const userToReturn = {...user.toJSON(), token};
    // delete userToReturn.password; // security purposes 
    
    return res.status(202).json(userToReturn);
});

module.exports = router;


