import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
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
        console.log(res.data.data)
        setOrders(res.data.data);
      });
  }, []);
  useEffect(() => {
    M.Collapsible.init(orderRef.current);
  }, []);

  return (
    <div>
      <h3>Order History</h3>
      <ul className="collapsible" ref={orderRef}>
        {orders
          ? orders.map((order) => {
              return (
                <li>
                  <div className="collapsible-header">
                    <i className="material-icons">history</i>
                    {order.user.fullName}
                  </div>
                  <div className="collapsible-body">                  
                    {order.cartItems.map((item, index) => {
                      return (
                        <div key= {index}>
                          {item.product.name}
                          <h5>
                          ₹ {item.product.price} X {item.quantity} =  ₹ {item.total}
                          </h5>                                               
                        </div>
                      );
                    })}
                    <h5>Total Price = ₹ {order.total}</h5>
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
