import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const Cart = () => {
  const cartItems = useSelector((state) => state.auth.cartItems);
  console.log(cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/user/getcartitems", {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res);
        dispatch({ type: "GET_CARTITEMS", payload: res.data });
      });
  }, []);
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
                      <div className="col-lg-7">
                        <h5>{cartItem.name}</h5>
                        <h6>{cartItem.description}</h6>
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
        <button className="btn btn-warning">Proceed to Buy</button>
      </div>
    </div>
  );
};

export default Cart;
