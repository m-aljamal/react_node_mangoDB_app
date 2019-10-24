const mongoose = require("mongoose");
// create schema for new collection
// it will describe how record will look like
const { Schema } = mongoose; // same as const Schema = mongoose.Schema
// here define the data that we need to save for each user
// in this app only need the user id
const userSchema = new Schema({
  googleId: String
  // can add another things
});

// here define name of collection 
// call it users 
mongoose.model("users", userSchema);
