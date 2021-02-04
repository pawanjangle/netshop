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
      axios.post("/product/getproductsbycategory", {category}, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      } ).then(res=>{
          dispatch({type: "PRODUCTS_BY_CATEGORY", payload: res.data})
      })
  }
  return (
    <div>
      <nav className="nav-extended">
        <div className="nav-wrapper">
          <a href="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
          {categories ? (
            categories.map((category, index) => {
              return (
                <ul id="nav-mobile" class="left hide-on-med-and-down">
                  <div>
                    <Link to="/productsbycategory">
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
