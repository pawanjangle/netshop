const express = require('express');
const router = express.Router();
const { requireLogin, uploadS3, validateSignupRequest, isSignupRequestValidated, validateSigninRequest, isSigninRequestValidated} = require("../middlewares/requireLogin");
const { signup, signin, getUserProfile, reset, newPassword, googleLogin, facebookLogin, setProfilePic, updateMob } = require("../controllers/user");
router.post("/signup", validateSignupRequest, isSignupRequestValidated,  signup);
router.post("/signin", validateSigninRequest, isSigninRequestValidated, signin);
router.get("/userprofile", requireLogin, getUserProfile);
router.post("/reset-password", reset)
router.post("/new-password", newPassword);
router.post("/googlelogin", googleLogin);
router.post("/facebooklogin", facebookLogin);
router.post("/setprofilepic", requireLogin, uploadS3.single("pic"), setProfilePic);
router.post("/updatemob", requireLogin, updateMob);
module.exports = router;