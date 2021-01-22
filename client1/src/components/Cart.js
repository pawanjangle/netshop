import React, { useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
const Cart = () => {
  const cartItems = useSelector((state) => state.auth.cartItems);
  const cartTotal = useSelector((state) => state.auth.cartTotal);

  console.log(cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/cart/getcartitems", {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "GET_CARTITEMS", payload: res.data });
      });
  }, []);
  const removeItemFromCart = (product) => {
    axios
      .put("/cart/removefromcart", product, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch({ type:"REMOVE_FROM_CART", payload: res.data });
      });
  };
  return (
    <div className="d-flex flex-wrap">
      <div className="col-lg-10 d-flex flex-column">
        <h4>Shopping Cart</h4>
        <div className="d-flex flex-column">
          {cartItems
            ? cartItems.map((cartItem) => {
                return (
                  <>
                    <div className="d-flex">
                      <div className="col-lg-2">
                        <img
                          src={cartItem.productPicture}
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-lg-7 d-flex flex-column">
                        <h5>{cartItem.name}</h5>
                        <h6>{cartItem.description}</h6>
                        <button className="btn btn-danger" onClick={()=>removeItemFromCart(cartItem)}>Remove From Cart</button>
                      </div>
                      <div className="col-lg-1">INR {cartItem.price}</div>
                    </div>                 
                  </>
                );
              })
            : "loading"}
        </div>
      </div>
      <div className="col-lg-2">
       <h6>Subtotal ( {cartItems ? cartItems.length : "0" } items) : </h6><h3> INR {cartTotal}</h3>      
        <button className="btn btn-warning"><Link to="/checkout">Proceed to Buy</Link> </button>
      </div>
    </div>
  );
};

export default Cart;
