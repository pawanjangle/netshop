const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true 
    },
    middleName: {
      type: String,    
    },
    lastName: {
      type: String,
      required: true   
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    contactNumber: {
      type: String,
    },
    profilePic:{
      type: String,
      default: "https://png.pngtree.com/png-clipart/20190924/original/pngtree-user-vector-avatar-png-image_4830521.jpg"
  },
    fullName: {type: String },
    resetToken: String,
    expireToken: String,
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
