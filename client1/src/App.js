import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import AddProduct from "./components/AddProduct";
import AddCategory from "./components/AddCategory";
import UpdateProduct from "./components/UpdateProduct";
import AllCategories from "./components/AllCategories";
import AllProducts from "./components/AllProducts";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import AdminSignup from "./components/AdminSignup";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import { useDispatch } from "react-redux";
import axios from "axios";
import NavbarComponent from "./components/NavbarComponent";
import ProductComponent from "./components/ProductComponent";
import Checkout from "./components/Checkout";
const Routing = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("/user/userprofile", {
          headers: {
            Authorization: "bearer " + token,
          },
        })
        .then((res) => {
          if (res.data.role === "user") {
            history.push("/");
            dispatch({
              type: "SIGNIN_USER",
              payload: { user: res.data, token },
            });
            axios
              .get("/cart/getcartitems", {
                headers: {
                  Authorization: "bearer " + localStorage.getItem("token"),
                },
              })
              .then((res) => {            
                dispatch({ type: "GET_CARTITEMS", payload: res.data });
              });
          }
          if (res.data.role === "admin") {
            history.push("/admin");
            dispatch({
              type: "SIGNIN_USER",
              payload: { user: res.data, token },
            });
          }
        });
    }
  }, []);
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ProductComponent} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/profile" component={Profile} />
        <Route exact path="/admin" component={Dashboard} />
        <Route path="/admin/signin" component={Signin} />
        <Route path="/admin/signup" component={AdminSignup} />
        <Route path="/admin/addproduct" component={AddProduct} />
        <Route path="/admin/addcategory" component={AddCategory} />
        <Route path="/admin/allcategories" component={AllCategories} />
        <Route path="/admin/allproducts" component={AllProducts} />
        <Route path="/admin/updateproduct" component={UpdateProduct} />
        <Route path="/checkout" component={Checkout} />
      </Switch>
    </div>
  );
};
function App() {
  return (
    <Router>
      <div className="App">
        <NavbarComponent />
        <Routing />
      </div>
    </Router>
  );
}

export default App;
