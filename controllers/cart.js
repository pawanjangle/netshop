const Cart = require("../models/cart");
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
    return res.status(200).json({message: "added to cart", cartItems: updatedCart.cartItems})
    }
    else{
    const newProduct = {product: id, quantity}
      const updatedCart = await Cart.findOneAndUpdate({_id: cartExist._id}, {$push:{cartItems: newProduct}}, {new: true}).populate("cartItems.product");
      return res.status(200).json({messsage: "added to cart", cartItems: updatedCart.cartItems } )
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
        return res.status(200).json({ message: "Added to cart", cartItems: updated.cartItems });
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
      console.log(cartItems)
      return res.status(200).json({message: "Removed from cart", cartItems: cartItems.cartItems})
    }
};
exports.getCartItems = async (req, res) => {
    const cart = await Cart.findOne({user: req.user._id}).populate("cartItems.product")
    if(cart){
      console.log(cart)
      // console.log(cart)
      // const cartItems = cart.cartItems;
      // let price = 0;
      // cart.cartItems.forEach(item=>{
      //   price= price + item.price
      // })
     
      return res.status(200).json({cartItems: cart.cartItems })
    }
};
