const jwt = require("jsonwebtoken");
const User = require("../models/user");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const shortid = require("shortid");
const {check, validationResult } = require("express-validator");
const s3 = new aws.S3({
  secretAccessKey : "6NOUJdDgzcs340r96TGzS7D2sg3thAwVW2k5sGVs",
  accessKeyId : "AKIAJTXN66QO6UKX55XQ"
}); 
exports.requireLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(400).json({ error: "You must be logged in" });
  }
  const token = authorization.replace("bearer ", "");
  const verified = await jwt.verify(token, process.env.jwtSecret);
  if (verified) {
    const { _id } = verified;
    const userdata = await User.findById({ _id });
    req.user = userdata;
    next();
  }
};
exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({ error: "Access denied" });
  }
  next();
};
exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ error: "Access denied" });
  }
  next();
};
exports.uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "netshop-web-app",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  }),
});
exports.validateSignupRequest = [
    check("firstName")
    .notEmpty()
    .withMessage("first name is required"),
    check("middleName")
    .notEmpty()
    .withMessage("middle name is required"),
    check("lastName")
    .notEmpty()
    .withMessage("last name is required"),
    check("email")
    .isEmail()
    .withMessage("valid email is required"),
    check("password")
    .isLength({min:6})
    .withMessage("Password must be atleast 6 characters long")
];
exports.isSignupRequestValidated= (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.json({error: errors.array()[0].msg})
    }
    next();
}
exports.validateSigninRequest = [
    check("email")
    .isEmail()
    .withMessage("valid email is required"),
    check("password")
    .isLength({min:6})
    .withMessage("Password must be atleast 6 characters long")
];
exports.isSigninRequestValidated= (req, res, next)=>{
    const errors = validationResult(req);
    if(errors.array().length > 0){
        return res.json({error: errors.array()[0].msg})
    }
    next();
}
