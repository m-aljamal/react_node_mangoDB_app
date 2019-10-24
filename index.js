const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User"); //! should required before passport
require("./services/passport"); // this not return anything so no variable need like const passport
mongoose.connect(keys.mongoURI);

const app = express();

//! start cookie config
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // how long cookie exists inside the browser before automaticly expired here we use 30 dayes
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//! end cookie config

require("./routes/authRoutes")(app); // same as const authRoutes = require('./routes/authRoutes')
// authRoutes(app)

//! start server config
const PORT = process.env.PORT || 3000;

app.listen(PORT);

//! end server config
