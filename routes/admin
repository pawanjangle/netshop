const express = require('express');
const router = express.Router();
const { signup, signin } = require("../controllers/admin");
const {requireLogin, adminMiddleware} = require("../middlewares/requireLogin")
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/", requireLogin, adminMiddleware, (req, res)=>{
    return res.json({message: "hi"})
});
module.exports = router;