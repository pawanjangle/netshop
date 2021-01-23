const Cart = require("../models/cart");
const {v4: uuidv4} = require("uuid");
const Order = require("../Models/order");
const stripe = require('stripe')(process.env.stripeSkey)
exports.addItemToCart = async (req, res) => {
  const { id, quantity} = req.body;
  const cartExist = await Cart.findOne({ user: req.user._id });
  if (cartExist) {
    const productExist = cartExist.cartItems.some(
      (item) => id === item.product.toString()
    );
    if(productExist){
    const updatedCart = await Cart.findOneAndUpdate({_id: cartExist._id, "cartItems.product": id}, {
      $inc:{"cartItems.$.quantity": quantity}
    }, {new: true}).populate("cartItems.product");
    let price = 0;
    updatedCart.cartItems.forEach(item=>{
      price= price + item.product.price * item.quantity
    })  
    return res.status(200).json({message: "added to cart", cartItems: updatedCart.cartItems, cartTotal: price})
    }
    else{
    const newProduct = {product: id, quantity}
      const updatedCart = await Cart.findOneAndUpdate({_id: cartExist._id}, {$push:{cartItems: newProduct}}, {new: true}).populate("cartItems.product");
      let price = 0;
      updatedCart.cartItems.forEach(item=>{
        price= price + item.product.price * item.quantity
      })  
      return res.status(200).json({messsage: "added to cart", cartItems: updatedCart.cartItems, cartTotal: price } )
    }
  } else {
    const newCart = new Cart({
      user: req.user._id,
    });
    const cart = await newCart.save();
    if (cart) {
      const updated = await Cart.findByIdAndUpdate(
        cart._id,
        { $push: { cartItems: { product: id, quantity } } },
        { new: true }
      ).populate("cartItems.product");
      if (updated) {
        let price = 0;
        updated.cartItems.forEach(item=>{
          price= price + item.product.price * item.quantity
        })  
        return res.status(200).json({ message: "Added to cart", cartItems: updated.cartItems, cartTotal: price });
      }
    }
  }
};
exports.removeItemFromCart = async (req, res) => {
      const {id} = req.body;
      console.log(id)
    const cartItems = await Cart.findOneAndUpdate({user: req.user._id}, {$pull: { cartItems: {product: id }}},
      {new: true}).populate("cartItems.product");
    if(cartItems){
      let price = 0;
      cartItems.cartItems.forEach(item=>{
        price= price + item.product.price * item.quantity
      })  
      return res.status(200).json({message: "Removed from cart", cartItems: cartItems.cartItems, cartTotal : price})
    }
};
exports.getCartItems = async (req, res) => {
    const cart = await Cart.findOne({user: req.user._id}).populate("cartItems.product")
    if(cart){ 
      let price = 0;
      cart.cartItems.forEach(item=>{
        price= price + item.product.price * item.quantity
      })   
      return res.status(200).json({cartItems: cart.cartItems, cartTotal: price })
    }
};

exports.checkout = async(req, res)=>{
    const {paymentInfo} = req.body;
const cart = await Cart.findOne({user: req.user._id}).populate("cartItems.product");
let price = 0;
cart.cartItems.forEach(item=>{
    price = price + item.product.price * item.quantity
});
const prevCustomer = await stripe.customers.list({
 email: paymentInfo.email
});
if(prevCustomer.data.length > 0){
  const charge = await stripe.charges.create({
    currency: "INR",
    amount: price * 100,
    receipt_email : paymentInfo.email,
    customer: prevCustomer.data[0].id,
    description: `You purchased a product | ${paymentInfo.email}`
},{
    idempotencyKey: uuidv4()
}) ;
await new Order({
  user: req.user._id,
  email: paymentInfo.email,
  total: price,
  cartItems: cart.cartItems
}).save();
const emaptyCart = await Cart.findOneAndUpdate({user: req.user._id},{ $set:{cartItems: []}}, {new: true});
return res.status(200).json({message: "payment successful", charge, cartItems: emaptyCart})
}
else{
  const newCustomer = await stripe.customers.create({
    email: paymentInfo.email,
    source: paymentInfo.id
  })
  const charge = await stripe.charges.create({
    currency: "INR",
    amount: price * 100,
    receipt_email : paymentInfo.email,
    customer: newCustomer.id,
    description: `You purchased a product | ${paymentInfo.email}`
},{
    idempotencyKey: uuidv4()
});
await new Order({
  user: req.user._id,
  email: paymentInfo.email,
  total : price,
  cartItems: cart.cartItems
}).save();
const emaptyCart =  await Cart.findOneAndUpdate({user: req.user._id},{ $set:{cartItems: []}}, {new: true});
return res.status(200).json({message: "payment successful", charge, cartItems: emaptyCart})
}
}
