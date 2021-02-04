import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
const NavbarComponent = () => {
  document.addEventListener("DOMContentLoaded", function () {
    const elems = document.querySelectorAll(".sidenav");
    const instances = M.Sidenav.init(elems);
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log(cartItems);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  console.log(user)
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
          <center>
        <li class="collection-item avatar">
           <img className="img-fluid" src={user.profilePic} style={{height: "60px", width:"60px"}} alt="" className="circle" />
            </li>     
           <li className="nav-item">
              <a>
                <Link className="" to="/profile">
                 Hello, {user.firstName}
                </Link>
              </a>
            </li>
            <li className="nav-item active">
              <a>
                <Link className="" to="/cart">
                  <ShoppingCartOutlinedIcon />
                  {cartItems ? cartItems.length : "0"}
                </Link>
                <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a>
                <Link to="/signin" onClick={() => signout()}>
                  Logout
                </Link>
              </a>
            </li>
            </center>
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
      <nav className="#4a148c purple darken-4">
        <div className="nav-wrapper">
          <Link to={user ? (user.role === "user" ? "/" : "/admin") : "/"}>
            <a className="brand-logo"> NETSHOP</a>
          </Link>
          <Link to="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </Link>
          <ul className="right hide-on-med-and-down">
            <ul className="">{renderList()}</ul>
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        <div
          className="#4a148c purple darken-4 d-flex justify-content-center align-items-center mb-3"
          style={{ height: "60px" }}
        >
          <Link to={user ? (user.role === "user" ? "/" : "/admin") : "/"}>
            NETSHOP
          </Link>
        </div>
        {renderList()}
      </ul>
    </div>
  );
};

export default NavbarComponent;
