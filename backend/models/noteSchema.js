const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    }
})

const notes = new mongoose.model("notes",noteSchema);


module.exports = notes;