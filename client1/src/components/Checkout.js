import React from 'react'
import axios from "axios"
import {useSelector} from "react-redux";
import StripeCheckout from "react-stripe-checkout";
const Checkout = () => {
    const cartTotal = useSelector(state=> state.auth.cartTotal);
    const cartItems = useSelector(state=> state.auth.cartItems);
const handleCheckout = (paymentInfo)=>{
  console.log(paymentInfo)
    }   
    return (
        <div>
            <StripeCheckout
            name = "Netshop"
            token = {(paymentInfo)=>handleCheckout(paymentInfo)}
            stripeKey = "pk_test_eybC0LNxchsp1GErzFpz1Xiw00fqxHBov8"
            amount= {cartTotal * 100}
            currency = "INR"
            image = {cartItems ? cartItems[0].productPicture : "Loading"}
            shippingAddress = {true}
            billingAddress = {true}
            />
        </div>
    )
}

export default Checkout
