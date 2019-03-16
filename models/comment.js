// CREATES THE MODEL/SCHEMA COMMENTS FOR THE DATABASE

var mongoose = require("mongoose")

var commmentSchema = mongoose.Schema({
    text: String,
    creator: {
         id: {
             type: mongoose.Schema.Types.ObjectId,
              ref: "User"
        },
        username: String,
    }
});

module.exports = mongoose.model("Comment", commmentSchema); 
