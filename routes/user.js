const express = require('express');
const router = express.Router();
const { requireLogin, userMiddleware } = require("../middlewares/requireLogin");
const { signup, signin } = require("../controllers/user");
router.post("/signup", signup);
router.post("/signin",  signin);
router.get("/", requireLogin, userMiddleware, (req, res)=>{
    res.json({message: "hi user"})
} );
module.exports = router;