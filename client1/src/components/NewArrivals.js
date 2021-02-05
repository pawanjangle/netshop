import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import { M } from "materialize-css";
const NewArrivals = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("/product/getproducts").then((res) => {
      console.log(res);
      dispatch({ type: "ALL_PRODUCTS", payload: res.data.products });
    });
  }, []);
  const products = useSelector((state) => state.product.products);
  console.log(products);
  return (      
        <div>

         </div>  
            
  );
};

export default NewArrivals;
