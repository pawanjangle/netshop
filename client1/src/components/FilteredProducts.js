import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import CategoryList from "./CategoryNav";
import TextTrim from "react-text-trim";
import Zoom from 'react-reveal/Zoom';
import CategoryNav from "./CategoryNav";
const FilteredProducts = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const token = useSelector((state) => state.auth.token);
  const filteredProducts = useSelector(
    (state) => state.product.filteredProducts
  );
  console.log(filteredProducts)
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
        if (res.data) {
          dispatch({ type: "ADD_TO_CART", payload: res.data });
          M.toast({
            html: "Added to cart",
            classes: "#00796b teal darken-2",
            displayLength: 1000,
          });
        }
      });
  };
  return (
    <div>
        <CategoryNav/>
      <Zoom>
      <div className="container-fluid pt-4">
        <div className="d-flex flex-wrap justify-content-center">
          {filteredProducts
            ? filteredProducts.map((product) => {
                return (
                  <>
                    <div className="col-sm-6 col-md-4 col-lg-3 mb-3">
                      <div className="card mr-3">
                        <div
                          style={{ minHeight: "250px" }}
                          className="d-flex justify-content-center align-items-center"
                        >
                          <img
                            className="card-img-top img-fluid col-sm-6 col-md-6"
                            src={product.productPicture}
                            alt=""
                            style={{ width: "80%" }}
                          />
                        </div>
                        <div className="card-body text-center">                                                           
                        <TextTrim
                          refId="TextTrim"
                          text={product.name}
                          minLines={2}                                          
                          showMoreLabel="Show More"
                          showLessLabel="Show Less"
                          delimiter="..."
                          fontSize={14}
                          lineHeight={16}
                          containerStyle={{}}
                          textWrapperStyle={{}}
                          buttonStyle={{}}
                        />  
                          <h6>₹ {product.price}</h6>
                          <div className="d-flex justify-content-around align-items-center">
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
                            <div className="text-center">
                              <button
                                className="text-decoration-none"
                                className="btn waves-effect waves-light "
                                onClick={() => {
                                  if (token) {
                                    addProductData(product._id);
                                  }
                                }}
                              >
                                <Link
                                  className="text-white"
                                  to={token ? "/filteredproducts" : "/signin"}
                                >
                                  Add To Cart
                                </Link>
                              </button>
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
      </div>
      </Zoom>
    </div>
  );
};
export default FilteredProducts;
