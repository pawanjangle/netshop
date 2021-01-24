const jwt = require("jsonwebtoken");
const User = require("../models/user");
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const shortid = require("shortid")
const s3 = new aws.s3({
  accessKeyId: "AKIAJQGIZGLTWVMURUYA",
  secretAccessKey: "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"
})
exports.requireLogin = async (req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization){
    return res.status(400).json({ error: "You must be logged in"})
  }
      const token = authorization.replace("bearer ", "") 
      const verified = await jwt.verify(token, process.env.jwtSecret);
      if(verified){
        const {_id} = verified;
      const userdata = await User.findById({_id});
      req.user = userdata;
      next();
      }   
}
exports.adminMiddleware = (req, res, next) => {
  if(req.user.role !== "admin") {
    return res.status(400).json({ error: "Access denied" });     
  }
  next();  
};
exports.userMiddleware = (req, res, next) => {
  if(req.user.role !== "user") {
    return res.status(400).json({ error: "Access denied" });     
  }
  next();  
};
exports.uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'netshop-web app',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname)
    }
  })
})
 
