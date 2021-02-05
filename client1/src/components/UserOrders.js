import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import TextTrim from "react-text-trim";
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
    <div className="container-fluid d-flex flex-column">     
      <div className="d-flex flex-column card p-3">
      <h4>Orders</h4>
        {orders.length > 0
          ? orders.map((order, index) => {
              return (
                <div key={index}>
                  {order.cartItems.map((cartItem, index) => {
                    return (
                      <div className="p-2">
                        <div className="d-flex flex-wrap">
                          <div className="col-md-2 d-flex justify-content-center">
                            <img
                              src={cartItem.product.productPicture}
                              alt=""
                              style={{ height: "100px" }}
                            />
                          </div>
                          <div className="col-md-2">
                            {cartItem.product.name}
                          </div>
                          <div className="col-md-5">                          
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
                          </div>
                          <div className="col-md-3 d-flex justify-content-center">
                            <b> price :</b> ₹ {cartItem.product.price} x{" "}
                            {cartItem.quantity} =<b>₹ {cartItem.total}</b>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="d-flex justify-content-center align-items-center">
                    <b>Total Price: ₹{order.total}</b>
                  </div>

                  <hr />
                </div>
              );
            })
          : "No previous Orders"}
      </div>
    </div>
  );
};

export default UserOrders;
