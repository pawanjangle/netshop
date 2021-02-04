const bcrypt = require("bcrypt");
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
   exports.signout = ( req, res )=>{
       res.clearCookie("token");
       res.status(200).json({
           message: "signout successfully"
       })
   }
   