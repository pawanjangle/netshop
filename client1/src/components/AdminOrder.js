import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import M from "materialize-css";
const AdminOrder = () => {
  const [orders, setOrders] = useState("");
  const orderRef = useRef(null);
  useEffect(() => {
    axios
      .get("/cart/ordersreceived", {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setOrders(res.data.data);
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
        {orders
          ? orders.map((order, index) => {
              return (
                <li key={index}>
                  <div className="collapsible-header d-flex align-items-center">
                    <i className="material-icons  mr-4">history</i>
                    <h6 className="font-weight-bold mr-4">{index + 1} </h6>{" "}
                    <h6 className="font-weight-bold">
                      Order date: {order.createdAt}
                    </h6>
                  </div>
                  <div className="collapsible-body">
                    <span className="font-weight-bold ">Ordered By:</span>{" "}
                    <span> {order.user.fullName}</span>
                    <br />
                    <span className="font-weight-bold">Email: </span>
                    <span>{order.email}</span>
                    {order.cartItems.map((item, index) => {
                      return (
                        <div key={index} className="d-flex justify-content-between">
                          <li>
                            <Link to={`/productdetails/${item.product._id}`}>                          
                              {item.product.name}
                            </Link>
                          </li>
                          <h6 className="font-weight-bold">
                        Price: ₹ {item.product.price} X {item.quantity} = ₹
                            {item.total}
                          </h6>
                        </div>
                      );
                    })}
                    <h6 className="font-weight-bold" style={{float: "right"}}>Total Price : ₹ {order.total}</h6>
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
