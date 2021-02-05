import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import M from "materialize-css";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "./Checkout";
import TextTrim from "react-text-trim";
import CategoryList from "./CategoryList";
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
        if (res.data.message) {
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
    <div>
      <CategoryList/>
      <div className="container-fluid d-flex flex-wrap mt-2">
        <div className="col-md-10 d-flex flex-column card">
          <h4 className="mb-3">Shopping Cart</h4>
          <div className="d-flex flex-column">
            {cartItems.length > 0
              ? cartItems.map((cartItem) => {
                  return (
                    <div
                      className="card d-flex flex-column justify-content-center"
                      style={{ minHeight: "300px" }}
                    >
                      <div className="d-flex flex-wrap">
                        <div className="col-md-3 d-flex justify-content-center">
                          <img
                            className="col-sm-6"
                            src={cartItem.product.productPicture}
                            alt=""
                            className="img-fluid"
                            style={{ maxHeight: "250px" }}
                          />
                        </div>
                        <div className="col-md-6 d-flex flex-column">
                          <h5 className="">{cartItem.product.name}</h5>
                          <TextTrim
                            refId="TextTrim"
                            text={cartItem.product.description}
                            minLines={3}
                            maxLines={10}
                            showMoreLabel="Show More"
                            showLessLabel="Show Less"
                            delimiter="..."
                            fontSize={14}
                            lineHeight={16}
                            containerStyle={{}}
                            textWrapperStyle={{}}
                            buttonStyle={{}}
                          />
                          <div className="text-center my-3">
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
                        <div className="col-md-3 d-flex flex-column align-items-center">
                          <h6>Price</h6>
                          <p>
                            {cartItem.quantity} X ₹ {cartItem.product.price} =
                            <b>₹ {cartItem.total}</b>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              : "There is no Item in cart"}
          </div>
        </div>
        <div className="col-md-2 card d-flex flex-column align-items-center">
          <h6>Subtotal ( {cartItems ? cartItems.length : "0"} items) : </h6>
          <h3> ₹ {cartTotal}</h3>
          {cartItems ? cartItems.length > 0 ? <Checkout /> : null : null}
        </div>
      </div>
    </div>
  );
};

export default Cart;
