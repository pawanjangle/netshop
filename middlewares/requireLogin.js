const jwt = require("jsonwebtoken");
const User = require("../models/user");
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
