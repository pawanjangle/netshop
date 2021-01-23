import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
const Checkout = () => {
  const dispatch = useDispatch();
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  const handleCheckout = (paymentInfo) => {
      axios.post("/cart/checkout", {paymentInfo}, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      } ).then(res=>{
          if(res.data.message){
            dispatch({ type: "CHECKOUT", payload: res.data})
          }
      })
  };
  return (
    <div>
      <StripeCheckout
        name="Netshop"
        token={(paymentInfo) => handleCheckout(paymentInfo)}
        stripeKey={process.env.REACT_APP_stripePKey}
        amount={cartTotal * 100}
        currency="INR"
        image={cartItems.length > 0 ? cartItems[0].product.productPicture : "Loading"}
        shippingAddress={true}
        billingAddress={true}
      />
    </div>
  );
};

export default Checkout;
