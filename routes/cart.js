const express = require("express");
const router = express.Router();
const { requireLogin, userMiddleware} = require("../middlewares/requireLogin");
const {  addItemToCart, getCartItems, removeItemFromCart, checkout, ordersReceived, userOrders } = require("../controllers/cart")
router.put("/addtocart", requireLogin, addItemToCart);
router.put("/removefromcart", requireLogin, removeItemFromCart);
router.get("/getcartitems", requireLogin, userMiddleware, getCartItems);
router.post("/checkout", requireLogin, checkout);
router.get("/ordersreceived", requireLogin, ordersReceived);
router.get("/userorders", requireLogin, userOrders);
module.exports = router;