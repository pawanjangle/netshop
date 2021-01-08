
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
exports.signup = async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) {
            return res.status(400).json({error: "Admin already registered"});
        }
        const hash_password = await bcrypt.hash(password, 12);            
        const _user = new User({
            firstName, lastName, email, hash_password,username: Math.random().toString(), role: "admin"
        });
        const user = await _user.save();
            if(!user){
                return res.status(400).json({error: "something went wrong"})
            }
            else{
                return res.status(201).json({message: "Admin created successfully"})
            }   
   }
   exports.signin = async (req, res) => {
    const {email, password } = req.body;
    const user = await User.findOne({ email: req.body.email});
    if(user && user.role === "admin"){
      const passwordMatched = await bcrypt.compare(password, user.hash_password);
      if(passwordMatched){
          const token = jwt.sign({_id: user._id}, process.env.jwtSecret);
          return res.status(200).json({ message: "Admin login successful", token})
      }
      else{
          return res.status(400).json({error: "Invalid email or password"})
      }
    }
    else{
     return res.status(400).json({error: "Invalid email or password"})
    }
    // User.findOne({ email: req.body.email})
    // .exec((error, user)=>{
    //     if(error) return res.status(400).json({ error});
    //     if(user){
    //         if(user.authenticate(req.body.password) && user.role === "admin"){
    //             const token = jwt.sign({ _id : user._id, role: user.role}, process.env.JWT_SECRET, { expiresIn: "1d"})
    //             const {firstName, lastName, email, role, fullName, _id} = user;
    //             res.cookie("token", token, {expiresIn: "1d"});
    //             return res.status(200).json({token, message: "login successful", user:{_id, firstName, lastName, email, role, fullName, }})
    //         }
    //         else{
    //             return res.status(400).json({ message: "invalid password"})
    //     }
        
    //     }
    //     else{
    //         return res.status(400).json({ message: "something went wrong"})
    //     }
    // })
   } 
   exports.signout = ( req, res )=>{
       res.clearCookie("token");
       res.status(200).json({
           message: "signout successfully"
       })
   }