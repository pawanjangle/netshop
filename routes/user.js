const express = require('express');
const router = express.Router();
const { requireLogin, userMiddleware } = require("../middlewares/requireLogin");
const { signup, signin, addItemToCart, getCartItems, removeItemFromCart, getUserProfile } = require("../controllers/user");
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/userprofile", requireLogin, getUserProfile);
module.exports = router;