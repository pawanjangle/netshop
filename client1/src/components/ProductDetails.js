import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import { useDispatch, useSelector } from "react-redux";
import CategoryNav from "./CategoryNav";
import Bounce from 'react-reveal/Bounce';
const ProductDetails = () => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    axios.get(`/product/productdetails/${id}`).then((res) => {
      if (res.data.product) {
        setProduct(res.data.product);
      }
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
        <Bounce>
      <div className="container-fluid">
        <div className="card p-3">
          <div className="d-flex flex-wrap align-items-center">
            <div className="col-md-3 text-center">
              <img
                src={product.productPicture}
                style={{ width: "60%" }}
                alt=""
              />
            </div>
            <div className="d-flex flex-column col-md-9 justify-content-center align-items-center">
              <h5>{product.name}</h5>
              <h6>{product.description}</h6>
              <h5 className="font-weight-bold">Price: ₹ {product.price}</h5>
              {user.role !== "admin" ? (
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
                  <div>
                  <button                   
                    className="btn waves-effect waves-light "
                    onClick={() => {
                      if (token) {
                        addProductData(product._id);
                      }
                    }}
                  >
                    <Link
                      className="text-white"
                      to={token ? `/productdetails/${product._id}` : "/signin"}
                    >
                      Add To Cart
                    </Link>
                  </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      </Bounce>
    </div>
  );
};
export default ProductDetails;
