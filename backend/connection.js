const mongoose = require('mongoose');

const DB_URI = "mongodb+srv://dhiraj2619:dhiraj55@cluster0.mnm69ma.mongodb.net/mern_notes?retryWrites=true&w=majority";

mongoose.connect(DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("connected succesfully to db")).catch((error)=>console.log(error.message))