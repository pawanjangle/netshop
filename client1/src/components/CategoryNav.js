import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Preloader from "./Preloader";
const CategoryNav = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  console.log(categories);
  const getProductsByCategory = (category) => {
    axios.post("/product/getproductsbycategory", { category }).then((res) => {
      dispatch({ type: "PRODUCTS_BY_CATEGORY", payload: res.data });
    });
  };
  return (
    <div>
      <nav className="hide-on-med-and-down">
        <div class="nav-wrapper #d500f9 purple accent-3">
          <ul className="left">
            {categories ? (
              categories.map((category, index) => {
                return (
                  <>
                    <li
                      className="nav-item"
                      onClick={() => {
                        getProductsByCategory(category.name);
                      }}
                    >
                      <Link to="/filteredproducts">{category.name}</Link>
                    </li>
                  </>
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
