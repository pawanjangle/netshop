import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import CategoryList from "./CategoryList";
const NavbarComponent = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
  });
  const dispatch = useDispatch();
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
            <li className="nav-item sidenav-close">
              <Link to="/userprofile">
                <img
                  className="img-fluid circle"
                  src={user.profilePic}
                  alt=""
                  style={{ height: "50px", width: "50px" }}
                />
              </Link>
            </li>
            <li className="nav-item sidenav-close">
              <a>
                <Link to="/userprofile">Hello, {user.fullName}</Link>
              </a>
            </li>
            <li className="nav-item sidenav-close">
              <a>
                <Link className="" to="/admin/allproducts">
                  Products
                </Link>
              </a>
            </li>
            <li className="nav-item sidenav-close">
              <a>
                <Link className="" to="/admin/allcategories">
                  Category
                </Link>
              </a>
            </li>
            <li className="nav-item sidenav-close">
              <a>
                <Link className="" to="/admin/receivedorders">
                  Orders
                </Link>
              </a>
            </li>
            <li className="nav-item sidenav-close">
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
            <li className="collection-item avatar sidenav-close">
              <Link to="/userprofile">
                <img
                  className="img-fluid circle"
                  src={user.profilePic}
                  style={{ height: "50px", width: "50px" }}
                  alt=""
                />
              </Link>
            </li>
            <li className="nav-item sidenav-close">
              <a>
                <Link className="" to="/profile">
                  Hello, {user.fullName}
                </Link>
              </a>
            </li>
            <li className="nav-item active sidenav-close">
              <a>
                <Link className="" to="/cart">
                  <div className="d-flex justify-content-center align-items-center flex-wrap">
                    {" "}
                    <i className="small material-icons mr-1">
                      add_shopping_cart
                    </i>
                    {cartItems ? cartItems.length : "0"}
                  </div>
                </Link>
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item sidenav-close">
              <a>
                <Link to="/signin" onClick={() => signout()}>
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
          <li className="nav-item sidenav-close">
            <Link to="/signin">Signin</Link>
          </li>
          <li className="nav-item sidenav-close">
            <Link to="/signup">Signup</Link>
          </li>
        </>,
      ];
    }
  };
  return (
    <div>
      <div className="navbar-fixed">
        <nav className="#4a148c purple darken-4 pl-3">
          <div className="nav-wrapper">
            <Link to={user ? (user.role === "user" ? "/" : "/admin") : "/"}>
              <a className="brand-logo logo"> NETSHOP</a>
            </Link>
            <Link
              to="#"
              data-target="mobile-demo slide-out"
              className="sidenav-trigger"
            >
              <i className="material-icons">menu</i>
            </Link>
            <ul className="right hide-on-med-and-down">{renderList()}</ul>
          </div>
        </nav>
      </div>
      <ul className="sidenav text-center flex-wrap" id="mobile-demo slide-out">
        <div
          className="navbar-brand logo #4a148c purple darken-4 d-flex justify-content-center align-items-center text-white mb-3"
          style={{ width: "100%", height: "90px" }}
        >
          <Link to={user ? (user.role === "user" ? "/" : "/admin") : "/"}>
            NETSHOP
          </Link>
        </div>
        {renderList()}
        <hr />
        {user.role !== "admin" ? (
          <>
            <h6>Shop By Category</h6>
            <CategoryList />
          </>
        ) : null}
      </ul>
    </div>
  );
};

export default NavbarComponent;
