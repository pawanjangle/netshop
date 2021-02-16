import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Preloader from "./Preloader";
import Slide from 'react-reveal/Slide';
const CategoryNav = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const getProductsByCategory = (category) => {
    axios.post("/product/getproductsbycategory", { category }).then((res) => {
      dispatch({ type: "PRODUCTS_BY_CATEGORY", payload: res.data });
    });
  };
  return (
    <div className= "navbar-fixed">
      <nav className="hide-on-med-and-down">
        <div class="nav-wrapper #651fff deep-purple accent-3">
          <ul className="">
            {categories ? (
              categories.map((category, index) => {
                return (
                  <div key={index}>
                  <Slide right>
                    <li 
                      className="nav-item"
                      onClick={() => {
                        getProductsByCategory(category.name);
                      }}
                    >
                      <Link to="/filteredproducts">{category.name}</Link>
                    </li>
                    </Slide>
                  </div>
                );
              })
            ) : (
              <Preloader />
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default CategoryNav;
