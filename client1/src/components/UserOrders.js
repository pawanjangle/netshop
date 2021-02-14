import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import TextTrim from "react-text-trim";
import Fade from "react-reveal/Fade";
const UserOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.userOrders);
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
                {index + 1}.  <span className="font-weight-bold my-2">
                    Order date: {order.createdAt}
                  </span>
                  {order.cartItems.map((cartItem, index) => {
                    return (
                      <Fade>
                        <div className="p-2">
                          <div className="d-flex flex-wrap">
                            <div className="col-md-2 d-flex justify-content-center">
                              <img
                                src={cartItem.product.productPicture}
                                alt=""
                                style={{ height: "100px" }}
                              />
                            </div>
                            <div className="col-md-2 d-flex justify-content-center">
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
                      </Fade>
                    );
                  })}
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <b>Total Price: ₹{order.total}</b>
                    <span className="font-weight-bold text-center">
                      Delivery Status : {order.deliveryStatus}
                    </span>
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
