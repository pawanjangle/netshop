const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config(); 
const sendgridTransport = require("nodemailer-sendgrid-transport");
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        process.env.nodemail,
    },
  })
);
exports.signup = async (req, res) => {
  const { firstName, middleName, lastName, email, password, contactNumber } = req.body;
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.json({ error: "user already registered" });
  }
  const hash_password = await bcrypt.hash(password, 12);
  const _user = new User({
    firstName,
    middleName,
    lastName,
    contactNumber,
    email,
    hash_password,
    username: Math.random().toString(),
  });
  const user = await _user.save();
  if (!user) {
    return res.json({ error: "something went wrong" });
  } else {
    return res.status(201).json({ message: "User created successfully", user });
  }
};
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const passwordMatched = await bcrypt.compare(password, user.hash_password);
    if (passwordMatched) {
      const token = jwt.sign({ _id: user._id }, process.env.jwtSecret);
      return res.status(200).json({ message: "login successful", token, user });
    } else {
      return res.json({ error: "Invalid email or password" });
    }
  } else {
    return res.json({ error: "Invalid email or password" });
  }
};
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-hash_password");
  if (user) {
    return res.status(200).json(user);
  } else {
    return res.json({ error: "Invalid User" });
  }
};
exports.reset = (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.json({ error: "User does no exist with this email" });
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user
        .save()
        .then((result) => {
          transporter.sendMail({
            to: result.email,
            from: "pawandjangle@outlook.com",
            subject: "password reset",
            html: `<p>You requested for password</p> <h5>click this <a href = "http://localhost:3000/reset/${token}">link </a> to reset</h5>`,
          });
          res.json({ message: "check your email inbox" });
        })
        .catch((err) => {
          res.json({ error: "something went wrong" });
        });
    });
  });
};
exports.newPassword = (req, res) => {
  const { sentToken, newPassword } = req.body;
  User.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        return res.json({ error: "session expired. Please try again later" });
      }
      bcrypt.hash(newPassword, 12).then((hashedPassword) => {
        user.hash_password = hashedPassword;
        user.resetToken = undefined;
        user.expireToken = undefined;
        user.save().then((savedUser) => {
          res.json({ message: "password updated successsfully", savedUser });
        });
      });
    })
    .catch((err) => {
      return res.json({ error: "something went wrong" });
    });
};
exports.googleLogin = async (req, res) => {
  const { email, password, firstName, lastName, profilePicture } = req.body;
  const userExist = await User.findOne({ email });
  if (!userExist) {
    const newUser = new User({
      firstName,
      lastName,
      email,
      hash_password: password,
      username: Math.random().toString(),
      fullName: firstName + " " + lastName,
      profilePicture,
    });
    const user = await newUser.save();
    if (user) {
      user.hash_password = null;
      const token = jwt.sign({ _id: user._id }, process.env.jwtSecret);
      return res.status(200).json({ message: "login successful", token, user });
    } else {
      return res.json({ error: "Something went wrong" });
    }
  } else {
    userExist.hash_password = null;
    const token = jwt.sign({ _id: userExist._id }, process.env.jwtSecret);
    return res
      .status(200)
      .json({ message: "login successful", token, user: userExist });
  }
};
exports.facebookLogin = async (req, res) => {
  const { email, password, fullName, profilePic } = req.body;
  const splitFullName = fullName.split(" ");
  const firstName = splitFullName[0];
  const lastName = splitFullName[1];
  const userExist = await User.findOne({ email });
  if (!userExist) {
    const hash_password = await bcrypt.hash(password, 12);
    const newUser = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: Math.random().toString(),
      fullName,
      profilePic,
    });
    const user = await newUser.save();
    if (user) {
      user.hash_password = null;
      const token = jwt.sign({ _id: user._id }, process.env.jwtSecret);
      return res.status(200).json({ message: "login successful", token, user });
    } else {
      return res.json({ error: "Something went wrong" });
    }
  } else {
    userExist.hash_password = null;
    const token = jwt.sign({ _id: userExist._id }, process.env.jwtSecret);
    return res
      .status(200)
      .json({ message: "login successful", token, user: userExist });
  }
};
exports.setProfilePic = async (req, res) => {
  if (req.file) {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        profilePic: req.file.location,
      },
      { new: true }
    );
    if (updatedUser) {
      return res
        .status(200)
        .json({ message: "Profile pic updated", user: updatedUser});
    } else {
      return res.json({ error: "failed to update Profile Pic"})
    }
  }
};
exports.updateMob = async (req, res)=>{
  const {mob} = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, {contactNumber: mob}, {new: true});
  if(user){
    return res.status(200).json({user, message: "Mob No. updated successfully"})
  }
  else{
    return res.json({error: "failed to update Mobile No."})
  }
}
