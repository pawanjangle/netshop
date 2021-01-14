const express = require('express');
const router = express.Router();
const { requireLogin, userMiddleware } = require("../middlewares/requireLogin");
const { signup, signin, addItemToCart, getCartItems } = require("../controllers/user");
router.post("/signup", signup);
router.post("/signin", signin);
router.put("/addtocart", requireLogin, userMiddleware, addItemToCart);
router.get("/getcartitems", requireLogin, userMiddleware, getCartItems);
module.exports = router;