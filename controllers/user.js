const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(422).json({ error: "Please add all credentials" });
  }
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).json({ error: "user already registered" });
    }
    const hash_password = await bcrypt.hash(password, 12);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: Math.random().toString(),
    });
    const user = await _user.save();
    if (!user) {
      return res.status(400).json({ error: "something went wrong" });
    } else {
      return res.status(201).json({ message: "User created successfully", user});
    }
};
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const passwordMatched = await bcrypt.compare(password, user.hash_password);
    if (passwordMatched) {
      const token = jwt.sign({ _id: user._id }, process.env.jwtSecret);
      return res.status(200).json({ message: "login successful", token, user});
    } else {
      return res.status(400).json({ error: "Invalid email or password" });
    }
  } else {
    return res.status(400).json({ error: "Invalid email or password" });
  }
};
exports.addItemToCart =  async (req, res) => {
  const product = req.body;
const cartItems = await User.findByIdAndUpdate(req.user._id, {$push: { cartItems: product}},
  {new: true});
if(cartItems){
  return res.status(200).json({message: "Added to cart", cartItems: cartItems.cartItems})
}
}
exports.removeItemFromCart =  async (req, res) => {
  const product = req.body;
const cartItems = await User.findByIdAndUpdate(req.user._id, {$pull: { cartItems: product}},
  {new: true});
if(cartItems){
  return res.status(200).json({message: "Removed from cart", cartItems: cartItems.cartItems})
}
}
exports.getCartItems =  async (req, res) => {
const user = await User.findById(req.user._id)
if(user){
  const cartItems = user.cartItems;
  return res.status(200).json(cartItems)
}
}
exports.getUserProfile =  async (req, res) => {
const user = await User.findById(req.user._id)
if(user){
  return res.status(200).json(user)
}
}
