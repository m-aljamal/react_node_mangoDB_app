const passport = require("passport");
// export this to use in index
module.exports = app => {
  // when go the this url at the first time there is error go to url given at error and at the callbackURL above to config
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"] // tell google server what access to have inside user profile and email google has these and more scopes
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));
  // loge out the current user
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send('log out');
  });
  // test to see the loged in user
  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
