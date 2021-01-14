import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    axios.get("/product/getproducts", {headers:{
Authorization: "bearer " + localStorage.getItem("token")
    } }).then((res) => {
      dispatch({ type: "ALL_PRODUCTS", payload: res.data.products });
    });
  }, []);
  const addProductData = (product)=>{
    
    axios.put("/user/addtocart", product, {headers: {
      Authorization : "bearer " + localStorage.getItem("token")
    }}).then(res=> {console.log(res.data); 
    dispatch({ type: "ADD_TO_CART", payload: res.data})})
  }
  return (
    <div>
      {products
        ? products.map((product) => {
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
                          <a className="btn btn-primary" onClick = {()=>addProductData(product)}>
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

export default Home;
