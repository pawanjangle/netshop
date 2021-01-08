const env = require('dotenv');
const express= require('express');
const app= express();
const bodyparser= require('body-parser');
const cors= require('cors');
const mongoose= require('mongoose');
//envioronment variables
env.config();
mongoose.connect(process.env.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
console.log("mongodb connection successful")    
});
app.use(express.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());
app.get("/", (req, res)=>{
return res.json({ message: "hello world"})
})
const port = process.env.port || 5000
app.listen(port, ()=>{console.log("express server is runnning on port "+ port)})