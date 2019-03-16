var express               = require("express"),
    app                   = express(),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    methodOverride        = require("method-override"),
    flash                 = require("connect-flash"),
    // Entree                = require("./models/entree"),
    // Comment               = require("./models/comment"),
    User                  = require("./models/user"),
    //testDB                = require("./test"),
    entreeRoute           = require("./routes/entrees"),
    commentRoute          = require("./routes/comments"),
    indexRoute            = require("./routes/index");
    
//ORDER MATTERS!!!!!!
mongoose.connect("mongodb://localhost/recipefordisaster", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");
//testDB();

app.use(require("express-session")({
    secret: "you are not a cook",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
//READING PASSPORT SESSION, ENCODING AND DECODING 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//GIVES EJS GLOBAL ACCESS TO THESE VARRIABLES 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("red");
    res.locals.success = req.flash("green");
    next();
});


app.use(indexRoute);
app.use("/entree", entreeRoute);
app.use("/entree/:id/comments", commentRoute);


//Start Server
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Server Initiated");
});
 
