const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
const keys = require("../config/keys");

// passport setup
// console.developers.google.com
// create new project
// OAuth consent screen
// add http://localhost:3000
// add http://localhost:3000/
// here I ot client id and client server
// new folder config -> keys.js this file made to note push keys into git add the file name in .gitignore
const User = mongoose.model("users"); // featch data from schema

//! start cookie config
// sending cooke to the user browser to save user id in memory
passport.serializeUser((user, done) => {
  done(null, user.id); // user.id is not the googleId it is mongoose how genreate that id
});
passport.deserializeUser((id, done) => {
  // first argiment is the token we sent before to user browser here
  // is user id
  // search for all record in database for user id
  User.findById(id).then(user => {
    // all query need promise
    done(null, user);
  });
});
//! end cookie config
// we can add another strategy just like the bellow google 
// also need to define the routes same as we did in authRoutes 
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback", // where user redirect after sign in
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // make serach inside collection to check if user alerdy has saved in database if not add him to database
      // will return promis, existingUser is the found value if nathing found the vaule is null
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // found a record in existingUser
          // call done to tell passport we finish
          done(null, existingUser); // null means there is no error we found the user
        } else {
          // don't have record with the given id
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user)); // in this object define the information the user will have here only need googleId
        }
      });
    }
  )
);
