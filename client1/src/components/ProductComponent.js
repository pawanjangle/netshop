import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const ProductComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const products = useSelector((state) => state.product.products);
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
        console.log(res.data);
        dispatch({ type: "ADD_TO_CART", payload: res.data });
      });
  };
  return (
    <div>
      <div className="container-fluid pt-4">
        <div className="col-lg-12 d-flex flex-wrap justify-content-center">
          {products
            ? products.map((product) => {
                return (
                  <>
                    <div className="col-lg-3">
                      <div className="card">
                        <img
                          className="card-img-top img-fluid"
                          src={product.productPicture}
                          alt="Card image cap"
                          style={{ height: "250px" }}
                        />
                        <div className="card-body">
                          <center>
                            <h6>{product.name}</h6>
                            <div className="d-flex justify-content-around">
                              <div className="form-group">                             
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="qty."
                                  onChange={(e) => {
                                    setQuantity(e.target.value);                                   
                                  }}
                                  style={{width: "50px"}}
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
                          </center>
                        </div>
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
