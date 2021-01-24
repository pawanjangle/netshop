import React from "react";
import AdminNavbar from "./AdminNavbar";
import AddProduct from "./AddProduct";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="container-fluid d-flex">
      <div
        className="col-lg-2 col-md-2 col-sm-2 col-xs-2 pt-3 d-flex flex-column"
        style={{ height: "100vh", borderRight: "1px solid" }}
      >
        <center>
          <Avatar alt="admin_Photo" src={{}} />
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a
                class=" dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Product
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item">
                  <Link to="/admin/addproduct">Add Product</Link>{" "}
                </a>
                <a class="dropdown-item">
                  <Link to="/admin/allproducts">All Products</Link>
                </a>
                <a class="dropdown-item">
                  {" "}
                  <Link to="/admin/deleteproduct">Delete Product</Link>
                </a>
                <a class="dropdown-item">
                  <Link to="/admin/updateproduct">Update Product</Link>
                </a>
                <div class="dropdown-divider"></div>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item dropdown">
              <a
                class=" dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Category
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item">
                  <Link to="/admin/addcategory">Add Category</Link>{" "}
                </a>{" "}
                <a class="dropdown-item">
                  <Link to="/admin/allcategories">All Categories</Link>
                </a>
                <a class="dropdown-item">
                  {" "}
                  <Link to="/admin/deletecategory">Delete Category </Link>
                </a>
                <a class="dropdown-item">
                  <Link to="/admin/updatecategory">Update Category</Link>
                </a>
                <div class="dropdown-divider"></div>
              </div>
            </li>
          </ul>
        </center>
      </div>
      <div className="col-lg-10">pages</div>
    </div>
  );
};

export default Dashboard;
