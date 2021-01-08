const env = require('dotenv');
const express= require('express');
const app= express();
const bodyparser= require('body-parser');
const cors= require('cors');
const mongoose= require('mongoose');
const user = require("./routes/user");
const admin = require("./routes/admin");
const category = require("./routes/category");
const path = require("path");
//envioronment variables
env.config();
mongoose.connect(process.env.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }).then(()=>{
console.log("mongodb connection successful")    
});
app.use(express.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());
app.use("/category", category)
app.use("/user", user );
app.use("/admin", admin )
app.use("/public", express.static(path.join(__dirname, "uploads")));
const port = process.env.port || 5000
app.listen(port, ()=>{console.log("express server is runnning on port "+ port)})