const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("../config/keys");


// passport setup
// console.developers.google.com
// create new project
// OAuth consent screen
// add http://localhost:3000
// add http://localhost:3000/
// here I ot client id and client server
// new folder config -> keys.js this file made to note push keys into git add the file name in .gitignore

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback" // where user redirect after sign in
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(accessToken);
        console.log(refreshToken); 
        console.log(profile); 
      }
    )
  );


  