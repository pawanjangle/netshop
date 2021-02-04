const Cart = require("../models/cart");
const {v4: uuidv4} = require("uuid");
const Order = require("../Models/order");
const Product = require("../models/product");
const stripe = require('stripe')("sk_test_RM6s93kiQFW1hggt7lDQ1YHh00RpA9K1BC")
exports.addItemToCart = async (req, res) => {
  const { id, quantity} = req.body;
  const cartExist = await Cart.findOne({ user: req.user._id });
  if (cartExist) {
    const productExist = cartExist.cartItems.some(
      (item) => id === item.product.toString()
    );
    if(productExist){    
      const productData = await Product.findOne({_id: id});
    const updatedCart = await Cart.findOneAndUpdate({_id: cartExist._id, "cartItems.product": id}, {
      $inc:{"cartItems.$.quantity": quantity, "cartItems.$.total": productData.price * quantity}
    }, {new: true}).populate("cartItems.product");
    let price = 0;
    updatedCart.cartItems.forEach(item=>{
      price= price + item.product.price * item.quantity
    })  
    return res.status(200).json({message: "added to cart", cartItems: updatedCart.cartItems, cartTotal: price})
    }
    else{ 
      const productData = await Product.findOne({_id: id});
   const productTotalPrice = productData.price * quantity;  
    const newProduct = {product: id, quantity, total : productTotalPrice}
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
      const productData = await Product.findOne({_id: id});
      const updated = await Cart.findByIdAndUpdate(
        cart._id,
        { $push: { cartItems: { product: id, quantity, total: productData.price * quantity } } },
        { new: true }
      ).populate("cartItems.product");
      if (updated) {
        let price = 0;
        updated.cartItems.forEach(item=>{
          price= price + item.product.price * item.quantity
        })  
        return res.status(200).json({ message: "Added to cart", cartItems: updated.cartItems, cartTotal: price });
      }
      else{
        return res.json({error: "Failed to add to cart"})
      }
    }
  }
};
exports.removeItemFromCart = async (req, res) => {
      const {id} = req.body;
     
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
        price = price + item.product.price * item.quantity
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
const order = await new Order({
  user: req.user._id,
  email: paymentInfo.email,
  total: price * 100,
  cartItems: cart.cartItems
}).save();
if(order){
  console.log(order)
  const emaptyCart = await Cart.findOneAndUpdate({user: req.user._id},{ $set:{cartItems: []}}, {new: true});
  return res.status(200).json({message: "payment successful", charge, cartItems: emaptyCart, order})
}
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
console.log(cart.cartItems)
const order =await new Order({
  user: req.user._id,
  email: paymentInfo.email,
  total : price,
  cartItems: cart.cartItems
}).save();
if(order){
  const emaptyCart =  await Cart.findOneAndUpdate({user: req.user._id},{ $set:{cartItems: []}}, {new: true});
return res.status(200).json({message: "payment successful", charge, cartItems: emaptyCart, order })
}
}
} 
exports.ordersReceived = async (req, res)=>{
  const orders = await Order.find().populate("cartItems.product").populate("user")
  if(orders){
      return res.status(200).json({ data: orders})
  }
  else{
      return res.json({error: "something went wrong"})
  }
}
exports.userOrders = async (req, res)=>{
  const orders = await Order.find({user: req.user._id}).populate("cartItems.product")
  if(orders){
      return res.status(200).json({orders})
  }
  else{
      return res.json({error: "something went wrong"})
  }
}
