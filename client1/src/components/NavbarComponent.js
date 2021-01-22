import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import axios from "axios"
const NavbarComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const signout = () => {
    localStorage.clear();
    dispatch({ type: "SIGNOUT_USER", payload: "logout successfully" });
  };
  const renderList = () => {
    if (token) {
      if (user.role === "admin") {
        return [
          <>
            <li className="nav-item">
              <a>
                <Link className="nav-link" to="/profile">
                  My Account
                </Link>
              </a>
            </li>   
            <li className="nav-item">
              <a>
                <Link
                  className="nav-link"
                  to="/signin"
                  onClick={() => signout()}
                >
                  Logout
                </Link>
              </a>
            </li>    
          </>,
        ];
      }
      if (user.role === "user") {
        return [
          <>
            <li className="nav-item">
              <a>
                <Link className="nav-link" to="/profile">
                  My Account
                </Link>
              </a>
            </li>
            <li className="nav-item active">
              <a>
                <Link className="nav-link" to="/cart">
                  <ShoppingCartOutlinedIcon />{" "}
                  {cartItems ? cartItems.length : "0"}
                </Link>
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a>
                <Link
                  className="nav-link"
                  to="/signin"
                  onClick={() => signout()}
                >
                  Logout
                </Link>
              </a>
            </li>
          </>,
        ];
      } 
    }
    else {
      return [
        <>
          <li className="nav-item active">
            <a>
              <Link className="nav-link" to="/signin">
                Signin
              </Link>
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a>
              <Link className="nav-link" to="/signup">
                Signup
              </Link>
            </a>
          </li>
        </>,
      ];
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark sticky-top">
        <Link to="/">
          <a className="navbar-brand">NETSHOP</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">{renderList()}</ul>
        </div>
      </nav>
    </div>
  );
};

export default NavbarComponent;
