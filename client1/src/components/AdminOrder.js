import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import M from "materialize-css";
import { useDispatch, useSelector } from "react-redux";
const AdminOrder = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const [delivery, setDelivery] = useState("");
  const [id, setOrderId] = useState("");
  const orderRef = useRef(null);
  useEffect(() => {
    if (delivery) {
      axios
        .post(
          "/cart/updateorderstatus",
          { delivery, id },
          {
            headers: {
              Authorization: "bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          if (res.data.message) {
            M.toast({
              html: res.data.message,
              classes: "#00796b teal darken-2",
              displayLength: 1000,
            });
            axios
              .get("/cart/ordersreceived", {
                headers: {
                  Authorization: "bearer " + localStorage.getItem("token"),
                },
              })
              .then((res) => {
                if (res.data.orders) {
                  dispatch({ type: "ALL_ORDERS", payload: res.data });
                } else {
                  M.toast({
                    html: res.data.error,
                    classes: "#f50057 pink accent-3",
                    displayLength: 1000,
                  });
                }
              });
          } else {
            M.toast({
              html: res.data.error,
              classes: "#f50057 pink accent-3",
              displayLength: 1000,
            });
          }
        });
    }
  }, [delivery]);
  useEffect(() => {
    axios
      .get("/cart/ordersreceived", {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.orders) {
          dispatch({ type: "ALL_ORDERS", payload: res.data });
        } else {
          M.toast({
            html: res.data.error,
            classes: "#f50057 pink accent-3",
            displayLength: 1000,
          });
        }
      });
  }, []);
  useEffect(() => {
    M.Collapsible.init(orderRef.current);
  }, []);

  return (
    <div className="container-fluid">
      <h4 className="font-weight-bold text-danger text-center">
        Order History
      </h4>
      <ul className="collapsible" ref={orderRef}>
        {orders.length > 0
          ? orders.map((order, index) => {
              return (
                <li key={index}>                       
                  <div className="collapsible-header d-flex">
                    <i className="material-icons  mr-4">history</i>
                    <h6 className="font-weight-bold mr-4">{index + 1} </h6>{" "}
                    <h6 className="font-weight-bold">
                      Order date: {order.createdAt}
                    </h6>
                  </div>
                  <div className="collapsible-body">
                  <div className="d-flex flex-column justify-content-start">   
                    <span className="font-weight-bold ">Ordered By:</span>{" "}
                    <span> {order.user.fullName}</span>
                    <br />
                    <span className="font-weight-bold">Email: </span>
                    <span>{order.email}</span>
                    {order.cartItems.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="d-flex justify-content-start flex-wrap"
                        >
                          <div className="col-sm-9">
                          <li>
                           {index + 1}. <Link to={`/productdetails/${item.product._id}`}>
                              {item.product.name}
                            </Link>
                          </li>
                          </div>
                          <div className="col-sm-3">
                          <h6 className="font-weight-bold">
                            Price: ₹ {item.product.price} X {item.quantity} = ₹
                            {item.total}
                          </h6>
                          </div>
                        </div>
                      );
                    })}
                    <h6 className="font-weight-bold">Delivery Status: {order.deliveryStatus}</h6>
                    <div className="d-flex justify-content-center align-items-center flex-wrap">                   
                        <div className="form-group col-sm-9">
                        <label>Set Delivery Status :</label>
                          <select
                            className="form-control" style={{width: "auto"}}
                            onClick={(e) => {
                              setOrderId(order._id);
                              setDelivery(e.target.value);
                            }}
                          >
                            <option>Pending</option>
                            <option>Delivered</option>
                          </select>                    
                      </div>
                      <div className="col-sm-3 d-flex justify-content-">
                        <h6 className="font-weight-bold">
                          Total Price : ₹ {order.total}
                        </h6>
                      </div>
                    </div>
                  </div>  
                  </div>            
                </li>
              );
            })
          : "No Orders at this time"}
      </ul>
    </div>
  );
};

export default AdminOrder;
