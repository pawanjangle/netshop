import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import M from "materialize-css";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "./Checkout";
import TextTrim from "react-text-trim";
import CategoryNav from "./CategoryNav";
import Flip from "react-reveal/Flip";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartTotal = useSelector((state) => state.cart.cartTotal);
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
      <CategoryNav />
      <div className="container-fluid d-flex flex-wrap mt-2">
        <div className="col-md-10 d-flex flex-column card">
          <h4 className="mb-3">Shopping Cart</h4>
      
            <div className="d-flex flex-column">
              {cartItems.length > 0
                ? cartItems.map((cartItem, index) => {
                    return (
                      <div
                        key={index}
                        className="card d-flex flex-column justify-content-center"
                        style={{ minHeight: "300px" }}
                      >
                        <div className="d-flex flex-wrap">
                          <div className="col-md-3 d-flex justify-content-center align-item-center">
                            <Link to={`/productdetails/${cartItem.product._id}`}>
                             <Flip> <img
                                className="img-fluid"
                                src={cartItem.product.productPicture}
                                alt=""
                              />
                              </Flip>
                            </Link>
                          </div>
                          <div className="col-md-6 d-flex flex-column">
                          <Link to={`/productdetails/${cartItem.product._id}`}><h5 className="">{cartItem.product.name}</h5></Link>
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
                            <h6>Price:</h6>
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
        <div className="col-md-2 card d-flex flex-column align-items-center py-3">
          <h6>Subtotal ( {cartItems ? cartItems.length : "0"} items) : </h6>
          <h3> ₹ {cartTotal}</h3>
          {cartItems ? cartItems.length > 0 ? <Checkout /> : null : null}
        </div>
      </div>
    </div>
  );
};

export default Cart;
