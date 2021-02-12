import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import M from "materialize-css"
import StripeCheckout from "react-stripe-checkout";
const Checkout = () => {
  const dispatch = useDispatch();
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const handleCheckout = (paymentInfo) => {
    axios
      .post(
        "/cart/checkout",
        { paymentInfo },
        {
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res)
        if (res.data.message) {
          dispatch({ type: "CHECKOUT", payload: res.data });
          M.toast({
            html: res.data.message,
            classes: "#00796b teal darken-2",
            displayLength: 1000,
          });
        }
        else{
          dispatch({type: "CHECKOUT_ERROR", payload: res.data})
          M.toast({
            html: res.data.error,
            classes: "#f50057 pink accent-3",
            displayLength: 1000,
          });
        }
      });
  };
  return (
    <div>
      <StripeCheckout
        name="Netshop"
        token={(paymentInfo) => handleCheckout(paymentInfo)}
        stripeKey={process.env.REACT_APP_stripePKey}
        amount={cartTotal * 100}
        currency="INR"
        image={
          cartItems.length > 0 ? cartItems[0].product.productPicture : "Loading"
        } 
        billingAddress={true}
        allowRememberMe= {false}
      />
    </div>
  );
};

export default Checkout;
