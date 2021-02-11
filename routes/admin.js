const express = require('express');
const router = express.Router();
const { signup } = require("../controllers/admin");
const { validateSignupRequest, isSignupRequestValidated} = require("../middlewares/requireLogin");
router.post("/signup", validateSignupRequest, isSignupRequestValidated, signup);
module.exports = router;