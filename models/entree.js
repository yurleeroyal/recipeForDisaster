var mongoose = require("mongoose");

// CREATES THE MODEL/SCHEMA ENTREE FOR THE DATABASE
var entreeSchema = new mongoose.Schema({
   name: String,
   image: String,
   description: String,
   creator: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
             ref: "User"
        },
        username: String,
    },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Entree", entreeSchema);
