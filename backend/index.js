const express = require("express");
require("dotenv").config();
const cors = require("cors")

const app = express();
const PORT = process.env.PORT || 8000

const database = require("./config/database");
database();

app.use(express.json());
app.use(cors())

const todoRoute = require('./routes/Todo');
app.use("/api/v1" ,todoRoute)


app.listen(PORT , ()=>{
    console.log(`Server listen at ${PORT}`)
})

app.get('/', (req,res)=>{
    res.send("<h1>This is HOMEPAGE</h1>")
});




