import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
const ProductComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.product.products);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    axios.get("/product/getproducts").then((res) => {
      dispatch({ type: "ALL_PRODUCTS", payload: res.data.products });
    });
  }, []);
  const addProductData = (id) => {
    axios
      .put(
        "/cart/addtocart",
        { id, quantity },
        {
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
          // M.toast({
          //   html: res.data.message,
          //   classes: "#00796b teal darken-2",
          //   displayLength: 1000,
          // });
          dispatch({ type: "ADD_TO_CART", payload: res.data });             
      });
  };
  return (
    <div>
      <div className="container-fluid pt-4">
        <div className="d-flex flex-wrap justify-content-center">
          {products
            ? products.map((product) => {
                return (
                  <>
                    <div className="col-sm-6 col-xs-12 col-md-4 col-lg-3 mb-3">
                      <div className="card mr-3">
                        <center>
                          <div
                            style={{ minHeight: "200px" }}
                            className="d-flex flex-column justify-content-center align-items-center"
                          >
                            <img
                              className="card-img-top img-fluid"
                              src={product.productPicture}
                              alt="Card image cap"
                              style={{ width: "30%", maxHeight: "200px" }}
                            />
                          </div>
                          <div className="card-body">
                            <h6 style={{ minHeight: "70px" }}>
                              {product.name}
                            </h6>
                            <h6>₹ {product.price}</h6>
                            <div className="d-flex justify-content-around">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="qty."
                                  onChange={(e) => {
                                    setQuantity(e.target.value);
                                  }}
                                  style={{ width: "50px" }}
                                />
                              </div>
                              <button
                                className="btn btn-primary"
                                onClick={() => {
                                  addProductData(product._id);
                                }}
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </center>
                      </div>
                    </div>
                  </>
                );
              })
            : "loading"}
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
