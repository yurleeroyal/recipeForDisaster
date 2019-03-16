// Exress Router handles all routes
var express    = require("express"),
    router     = express.Router();
var Entree     = require("../models/entree");
var midWare    = require("../middleware");


//======================ENTREE ROUTES======================//


//INDEX SHOWS ALL ENTREES 
router.get("/", function(req, res){
    // GET ALL ENTRESS FROM DATABASE
    Entree.find({}, function(err, showAllEntrees){
       if(err){
           console.log(err);
       } else {
          res.render("entree/index",{entrees: showAllEntrees});
       }
    });
});

//CREATE, ADDS ENTREE TO THE DATABASE
router.post("/", midWare.areYouLoggedIn, function(req, res){
    // GET THE DATA FROM THE FORM AND CREATE A NEW DISH
    var name   = req.body.name;
    var image  = req.body.image;
    var desc   = req.body.description;
    var creator = {
        id: req.user._id,
        username: req.user.username
    }
    var newEntree = {name: name, image: image, description: desc, creator: creator}
    // CREATE NEW ENTREE AND ADD TO THE DATABSE
    Entree.create(newEntree, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //REDIRECT BACK TO ALL ENTREES
            //console.log(newlyCreated);
            req.flash("green", "A New Dish Has Been Added");
            res.redirect("/entree");
        }
    });
});

//NEW FORM THAT CREATES A NEW ENTREE
router.get("/new", midWare.areYouLoggedIn, function(req, res){
   res.render("entree/new"); 
});

// DETAILED ENTREE(sHOWS MORE INFO ABOUT THE CLICKED ENTREE)
router.get("/:id", function(req, res){
    //FIND ENTREE BY ID
    Entree.findById(req.params.id).populate("comments").exec(function(err, selectedEntree){
        if(err){
            console.log(err);
        } else {
            //RENDERS THE DETAILED ENTREE TEMPLATE
            res.render("entree/show", {entree: selectedEntree});
        }
    });
});


/// EDIT- EDIT ENTREE
router.get("/:id/edit", midWare.checkIfUserCreatedEntree, function(req, res) {
    Entree.findById(req.params.id, function(err, selectedEntree){
        res.render("entree/edit", {entree: selectedEntree});
    });
});

// UPDATE- UPDATES THE SELECTED ENTREE  
router.put("/:id", midWare.checkIfUserCreatedEntree, function(req, res){
    Entree.findByIdAndUpdate(req.params.id, req.body.entree, function(err, entreeUpdate){
        if(err){
            console.log(err);
            res.redirect("/entree");
        }else {
            res.redirect("/entree/" + req.params.id);
        }
    });
});

//DDDDDDDDDD DESTROY THE ENTREE
router.delete("/:id", midWare.checkIfUserCreatedEntree, function(req, res){
    Entree.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/entree");
        } else{
            res.redirect("/entree");
        }
    });
});

//EXPORTS THE ENTREE ROUTE TO APP.JS
module.exports = router;
