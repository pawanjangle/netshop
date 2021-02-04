import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const UserOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  console.log(orders);
  useEffect(() => {
    axios
      .get("/cart/userOrders", {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.orders) {
          dispatch({ type: "GET_ORDERS", payload: res.data });
        } else {
          dispatch({ type: "ERROR_GETTING_ORDERS", payload: res.data });
        }
      });
  }, []);
  return (
    <div>
      <div className="container-fluid d-flex flex-column card">
        <h4>Orders</h4>
        <div className="d-flex flex-column">
          {orders.length > 0
            ? orders.map((order, index) => {
                return (
                  <div key={index} className="mb-5">
                    {order.cartItems.map((cartItem, index) => {
                      return (
                        <div className="d-flex flex-wrap">
                          <div className="col-md-2">
                            <img
                              src={cartItem.product.productPicture}
                              alt=""
                              style={{ height: "100px" }}
                            />
                          </div>
                          <div className="col-md-2">
                            {cartItem.product.name}
                          </div>
                          <div className="col-md-5">{cartItem.product.description}</div>
                          <div className="col-md-3 d-flex justify-content-center">
                        <b> price:</b> ₹{cartItem.product.price} x {cartItem.quantity} =
                           <b>₹{cartItem.total}</b>
                          </div>
                        </div>
                      );
                    })}
                    <div className="d-flex justify-content-center"><b>Total Price: ₹{order.total}</b></div>
                   
                   <hr/>
                  </div>
                );
              })
            : "No previous Orders"}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
