const env = require("dotenv");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const user = require("./routes/user");
const admin = require("./routes/admin");
const category = require("./routes/category");
const product = require("./routes/product");
const cart = require("./routes/cart");
//envioronment variables
env.config();
mongoose
  .connect("mongodb+srv://pawanjangle:adgjmp100@cluster0.yculf.mongodb.net/Netshop?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("mongodb connection successful");
  });
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cors());
app.use("/cart", cart);
app.use("/product", product);
app.use("/category", category);
app.use("/user", user);
app.use("/admin", admin);
// Serve any static files
app.use(express.static(path.join(__dirname, "client1/build")));
// Handle React routing, return all requests to React app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client1/build", "index.html"));
});
  // }
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("express server is runnning on port " + port);
});
