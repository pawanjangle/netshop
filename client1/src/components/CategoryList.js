import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Preloader from "./Preloader";
const CategoryList = () => {
    const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  console.log(categories);
  const getProductsByCategory = (category)=>{
      axios.post("/product/getproductsbycategory", {category} ).then(res=>{
          dispatch({type: "PRODUCTS_BY_CATEGORY", payload: res.data})
      })
  }
  return (
    <div>
      <nav className="nav-extended #d500f9 purple accent-3">
        <div className="nav-wrapper">
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons" >menu</i>
          </a>
          {categories ? (
            categories.map((category, index) => {
              return (
                <ul id="nav-mobile" className="left hide-on-med-and-down">
                  <div>
                    <Link to="/filteredproducts">
                      <li onClick={()=>{
                          getProductsByCategory(category.name)
                      }}>{category.name}</li> 
                    </Link>
                  </div>
                </ul>
              );
            })
          ) : (
            <Preloader />
          )}
        </div>
      </nav>
    </div>
  );
};

export default CategoryList;
