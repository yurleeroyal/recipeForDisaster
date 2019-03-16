// Exress Router handles all routes
var express    = require("express"),
    router     = express.Router({mergeParams: true}),
    Comment    = require("../models/comment"),
    Entree     = require("../models/entree"),
    midWare    = require("../middleware"); 

//FORM THAT CREATES NEW COMMENT
router.get("/new", midWare.areYouLoggedIn, function(req, res){
    Entree.findById(req.params.id, function(err, selectedEntree){
        if(err){
            console.log(err);
        } else{
             res.render("comments/new", {entree: selectedEntree});   
        }
    });
});

//ADDING NEW COMMENT TO THE DATABASE
router.post("/", midWare.areYouLoggedIn, function(req, res){
    //lOOKING UP BY ID
    Entree.findById(req.params.id, function(err , entree){
        if(err){
            console.log(err);
            res.redirect("/entree");
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // ADDING A USERBANE AND ID TO COMMENT
                    comment.creator.id = req.user._id
                    comment.creator.username = req.user.username
                    //SAVE COMMENT AND ADDING IT TO THE ENTREE
                    comment.save();
                    entree.comments.push(comment);
                    entree.save();
                    //console.log(comment);
                    req.flash("green", "Your comment has been added");
                    res.redirect('/entree/' + entree._id);
                }
            });
        }
    });
});

//EDIT COMMENT
router.get("/:comment_id/edit", midWare.checkIfUserCreatedComment, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        } else{
            res.render("comments/edit", {entree: req.params.id, comment: foundComment});
        }
    });
});

//UPDATE COMMENT
router.put("/:comment_id", midWare.checkIfUserCreatedComment, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/entree/" + req.params.id);
        }
    });
});

//DDDDDDDESTROY THE COMMENT
router.delete("/:comment_id", midWare.checkIfUserCreatedComment, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            //console.log(err);
            res.redirect("back");
        }else{
            res.redirect("/entree/" + req.params.id);
        }
    });
});

module.exports = router;
