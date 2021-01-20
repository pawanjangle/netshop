import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import NavbarComponent from "./NavbarComponent";
const ProductComponent = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    axios.get("/product/getproducts").then((res) => {
      dispatch({ type: "ALL_PRODUCTS", payload: res.data.products });
    });
  }, []);
  const addProductData = (product) => {
    axios
      .put("/user/addtocart", product, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
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
                          alt="Card image cap" style={{height: "250px"}}
                        />
                        <div className="card-body">
                          <center>
                            <h6>{product.name}</h6>
                            <button className="btn btn-primary" onClick={()=>{
                              addProductData(product)
                            }}>
                              Add To Cart
                            </button>
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
