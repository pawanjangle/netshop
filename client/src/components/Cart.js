import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector} from "react-redux";
const Cart = () => {
    const cartItems = useSelector(state=> state.cart.cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("/user/getcartitems", {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        dispatch({ type: "GET_CARTITEMS", payload: res.data });
      });
  }, []);
  return (
    <div>
    {cartItems
      ? cartItems.map((product) => {
          return (
            <>
              <div className="container">
                <div className="row">
                  <div className="product">
                    <div className="card" style={{ width: "100px" }}>
                      <img
                        className="card-img-top"
                        src={product.productPicture}
                        alt="Card image cap"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">{product.description}</p>                  
                        <a className="btn btn-primary" >
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })
      : "loading"}
  </div>
  );
};

export default Cart;
