var Comment = require("../models/comment"),
    Entree  = require("../models/entree");
    
var midWare = {};    
    

midWare.checkIfUserCreatedEntree = function(req, res, next){
    //IS THIS USER LOGGED IN? LETS CHECK
    if(req.isAuthenticated()){
        Entree.findById(req.params.id, function(err, chosenEntree) {
            if(err){
                req.flash("red", "Unable to find what you are looking for");
                res.redirect("back");
            } else {
                //LETS CHECK IF THE USER UPLOADED THIS ENTREE
                if(chosenEntree.creator.id.equals(req.user._id)){
                    next();
                }else {
                    req.flash("red", "WARNING: YOU ARE NOT ALLOWED TO DO THIS");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("red", "Snah You Need To Log In");
        res.redirect("back");
    }
};

midWare.checkIfUserCreatedComment = function(req, res, next){
     if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err){
                res.redirect("back");
            } else {
                //DID YOU MAKE THIS COMMENT ON THIS ENTREE? LETS SEE
                if(foundComment.creator.id.equals(req.user._id)){
                    next();
                }else {
                    req.flash("red", "WARNING: YOU ARE NOT ALLOWED TO DO THIS");
                    res.redirect("back");
                }
            }
        });
    }else{
        req.flash("red", "Log In Please");
        res.redirect("back");
    }
};

midWare.areYouLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("red", "Snah You Need To Log In");
    res.redirect("/login");
}
    
module.exports = midWare;
