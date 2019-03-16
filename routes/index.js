// EXPRESS ROUTING, HANDLES ALL ROUTES
var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    User     = require("../models/user");

router.get("/", function(req, res){
    res.render("landing");
});


//======================AUTHENTICATION ROUTES======================//


router.get("/register", function(req, res) {
    res.render("register");
});


router.post("/register", function(req, res){
    req.body.username
    req.body.password
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err)
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("green", "You Are Signed Up And Ready To Go " + user.username);
            res.redirect("/entree");
        });
    });
});


//======================LOGIN ROUTES======================//

router.get("/login", function(req, res) {
    res.render("login");
});


//LOGIN app.posT("/login", middleware, callback)
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/entree",
        failureRedirect: "/login"
    }), function(req, res){
});


//LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("green", "We will hola at you later");
    res.redirect("/entree");
});

module.exports = router;
