import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import axios from "axios";
const NavbarComponent = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const elems = document.querySelectorAll(".sidenav");
    const instances = M.Sidenav.init(elems);
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems)
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
                <Link className="" to="/profile">
                  My Account
                </Link>
              </a>
            </li>
            <li className="nav-item">
              <a>
                <Link className="" to="/signin" onClick={() => signout()}>
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
                <Link className="" to="/profile">
                  My Account
                </Link>
              </a>
            </li>
            <li className="nav-item active">
              <a>
                <Link className="" to="/cart">
                  <ShoppingCartOutlinedIcon />{" "}
                  {cartItems ? cartItems.length : "0"}
                </Link>
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a>
                <Link className="" to="/signin" onClick={() => signout()}>
                  Logout
                </Link>
              </a>
            </li>
          </>,
        ];
      }
    } else {
      return [
        <>
          <li className="nav-item active">
            <a>
              <Link to="/signin">Signin</Link>
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a>
              <Link to="/signup">Signup</Link>
            </a>
          </li>
        </>,
      ];
    }
  };
  return (
    <div>
      <nav className="#4a148c purple darken-4" >
        <div class="nav-wrapper">
          <Link to={user ? (user.role === "user" ? "/" : "/admin") : "/"}>
            <a class="brand-logo"> NETSHOP</a>
          </Link>
          <a href="#" data-target="mobile-demo" class="sidenav-trigger">
            <i class="material-icons">menu</i>
          </a>
          <ul class="right hide-on-med-and-down">
            <ul className="">{renderList()}</ul>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <li>
          <a href="sass.html">Sass</a>
        </li>
        <li>
          <a href="badges.html">Components</a>
        </li>
        <li>
          <a href="collapsible.html">Javascript</a>
        </li>
        <li>
          <a href="mobile.html">Mobile</a>
        </li>
      </ul>
    </div>
  );
};

export default NavbarComponent;
