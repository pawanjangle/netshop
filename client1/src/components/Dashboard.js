import React, { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import Profile from "./Profile";
import { useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const dispatch = useDispatch();
  return (
   <div>
     <Profile/>
     </div>

    // <div classNameName="container-fluid d-flex">
    //   <div
    //     classNameName="col-lg-2 col-md-2 col-sm-2 col-xs-2 pt-3 d-flex flex-column"
    //     style={{ height: "100vh", borderRight: "1px solid" }}
    //   >
    //     <center>
    //       <Avatar alt="admin_Photo" src={{}} />
    //       <ul className="navbar-nav mr-auto">
    //         <li className="nav-item dropdown">
    //           <a
    //             className=" dropdown-toggle"
    //             href="#"
    //             id="navbarDropdown"
    //             role="button"
    //             data-toggle="dropdown"
    //             aria-haspopup="true"
    //             aria-expanded="false"
    //           >
    //             Product
    //           </a>
    //           <div className="dropdown-menu" aria-labelledby="navbarDropdown">
    //             <a className="dropdown-item">
    //               <Link to="/admin/addproduct">Add Product</Link>{" "}
    //             </a>
    //             <a className="dropdown-item">
    //               <Link to="/admin/allproducts">All Products</Link>
    //             </a>
    //             <div className="dropdown-divider"></div>
    //           </div>
    //         </li>
    //       </ul>
    //       <ul className="navbar-nav mr-auto">
    //         <li className="nav-item dropdown">
    //           <a
    //             className=" dropdown-toggle"
    //             href="#"
    //             id="navbarDropdown"
    //             role="button"
    //             data-toggle="dropdown"
    //             aria-haspopup="true"
    //             aria-expanded="false"
    //           >
    //             Category
    //           </a>
    //           <div className="dropdown-menu" aria-labelledby="navbarDropdown">
    //             <a className="dropdown-item">
    //               <Link to="/admin/addcategory">Add Category</Link>{" "}
    //             </a>{" "}
    //             <a className="dropdown-item">
    //               <Link to="/admin/allcategories">All Categories</Link>
    //             </a>
    //             <div className="dropdown-divider"></div>
    //           </div>
    //         </li>
    //       </ul>
    //       <ul className="navbar-nav mr-auto">
    //         <li className="nav-item dropdown">
    //           <a
    //             className=" dropdown-toggle"
    //             href="#"
    //             id="navbarDropdown"
    //             role="button"
    //             data-toggle="dropdown"
    //             aria-haspopup="true"
    //             aria-expanded="false"
    //           >
    //             Order
    //           </a>
    //           <div className="dropdown-menu" aria-labelledby="navbarDropdown">
    //             <a className="dropdown-item">
    //               <Link to="/admin/addcategory">Add Category</Link>{" "}
    //             </a>{" "}
    //             <a className="dropdown-item">
    //               <Link to="/admin/receivedorders">All Orders</Link>
    //             </a>
    //             <div className="dropdown-divider"></div>
    //           </div>
    //         </li>
    //       </ul>
    //     </center>
    //   </div>
    //   <div classNameName="col-lg-10">pages</div>
    // </div>
  );
};

export default Dashboard;
