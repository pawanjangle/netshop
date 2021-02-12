import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Preloader from "./Preloader";
const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const getProductsByCategory = (category) => {
    axios.post("/product/getproductsbycategory", { category }).then((res) => {
      dispatch({ type: "PRODUCTS_BY_CATEGORY", payload: res.data });
    });
  };
  return (
    <div>
            {categories ? (
              categories.map((category, index) => {
                return (
                  <ul className="text-center" key={index}>
                    <li
                      className="nav-item sidenav-close"
                      onClick={() => {
                        getProductsByCategory(category.name);
                      }}
                    >
                      <Link to="/filteredproducts">{category.name}</Link>
                    </li>
                  </ul>
                );
              })
            ) : (
              <Preloader/>
            )}
    </div>
  );
};

export default CategoryList;
