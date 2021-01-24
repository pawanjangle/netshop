import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import M from "materialize-css"
import { useDispatch, useSelector } from "react-redux";
import Checkout from "./Checkout"
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
  console.log(cartItems);
  const dispatch = useDispatch();
  const removeItemFromCart = (id) => {
    axios
      .put(
        "/cart/removefromcart",
        { id },
        {
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
       if(res.data.message){
        dispatch({ type: "REMOVE_FROM_CART", payload: res.data });
        M.toast({
          html: res.data.message,
          classes: "#00796b teal darken-2",
          displayLength: 1000,
        });
       }     
      });
  };
  return (
    <div className="container-fluid d-flex flex-wrap">
      <div className="col-sm-12 col-md-10 col-lg-10 col-xs-12 d-flex flex-column card">
        <h4 className="mb-3">Shopping Cart</h4>
        <div className="d-flex flex-column">
          {cartItems
            ? cartItems.map((cartItem) => {
                return (
                  <div className="card d-flex flex-column justify-content-center align-Items-center" style={{minHeight: "300px"}}>
                    <div className="d-flex flex-wrap mb-3">
                      <div className="col-lg-3 col-md-3 col-xs-12">
                        <img
                          src={cartItem.product.productPicture}
                          alt=""
                          className="img-fluid" style={{maxHeight: "250px"}}
                        />
                      </div>
                      <div className="col-lg-8 col-md-8 col-xs-12 ">
                        <h5>{cartItem.product.name}</h5>
                        <h6>{cartItem.product.description}</h6>
                      <div className="text-center">
                      <button
                          className="btn btn-danger"
                          onClick={() =>
                            removeItemFromCart(cartItem.product._id)
                          }
                        >
                          Remove From Cart
                        </button>
                        </div> 
                      </div>
                      <div className="col-lg-1 col-md-1 col-xs-12 d-flex text-center">                                      
                          {cartItem.quantity} X ₹{cartItem.product.price}                    
                      </div>
                    </div>
                  </div>
                );
              })
            : "loading"}
        </div>
      </div>
      <div className="col-md-2 col-lg-2 card">
        <h6>Subtotal ( {cartItems ? cartItems.length : "0"} items) : </h6>
        <h3> ₹ {cartTotal}</h3>
        {cartItems.length > 0 ? (
          <Checkout/>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
