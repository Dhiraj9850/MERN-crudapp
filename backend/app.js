require("dotenv").config();
const express = require('express');
const app = express();

// connection to database 
require("./connection")

// importing noteSchema
const notes = require("./models/noteSchema");
const cors = require("cors");

// importing routes 
const router = require("./routes/router");

const port = 8000;


app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port,()=>{
    console.log(`server is start on port ${port}`);
});
