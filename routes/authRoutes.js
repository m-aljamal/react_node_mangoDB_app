const passport = require("passport");

module.exports = (app) => {
  // when go the this url at the first time there is error go to url given at error and at the callbackURL above to config
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"] // tell google server what access to have inside user profile and email google has these and more scopes
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));
};
