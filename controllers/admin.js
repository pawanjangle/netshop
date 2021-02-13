const bcrypt = require("bcrypt");
const User = require("../models/user");
exports.signup = async (req, res) => {
    const {firstName, middleName, lastName, contactNumber, email, password} = req.body;
    const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) {
            return res.status(400).json({error: "Admin already registered"});
        }
        const hash_password = await bcrypt.hash(password, 12);            
        const _user = new User({
            firstName, middleName, lastName, email, hash_password,username: Math.random().toString(), role: "admin", contactNumber, fullName: `${firstName} ${middleName}  ${lastName}`, 
        });
        const user = await _user.save();
            if(!user){
                return res.status(400).json({error: "something went wrong"})
            }
            else{
                return res.status(201).json({message: "Admin created successfully"})
            }   
   }