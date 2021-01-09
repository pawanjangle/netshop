const express = require("express");
const router = express.Router();
const { requireLogin, userMiddleware } = require("../middlewares/requireLogin");
const { addItemToCart } = require("../controllers/cart");
router.post("/cart/addtocart", requireLogin, userMiddleware, addItemToCart);
module.exports = router;
