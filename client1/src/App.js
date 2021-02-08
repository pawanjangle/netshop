import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  Redirect,
} from "react-router-dom";
import jwt from "jsonwebtoken";
import AddProduct from "./components/AddProduct";
import AddCategory from "./components/AddCategory";
import UpdateProduct from "./components/UpdateProduct";
import UpdateCategory from "./components/UpdateCategory";
import AllCategories from "./components/AllCategories";
import AllProducts from "./components/AllProducts";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import AdminSignup from "./components/AdminSignup";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import NavbarComponent from "./components/NavbarComponent";
import ProductComponent from "./components/ProductComponent";
import Checkout from "./components/Checkout";
import NewPassword from "./components/NewPassword";
import AdminOrder from "./components/AdminOrder";
import Reset from "./components/Reset";
import UserProfile from "./components/UserProfile";
import UserOrders from "./components/UserOrders";
import FilteredProducts from "./components/FilteredProducts";
import ProductDetails from "./components/ProductDetails";
const SecuredRoute = (props) => {
  const auth = useSelector((state) => state.auth.authenticated);
  return (
    <Route
      path={props.path}
      render={(data) =>
        auth ? (
          <props.component {...data}></props.component>
        ) : (
          null
          // <Redirect to={{ pathname: "/" }}></Redirect>
        )
      }
    />
  );
};
const Routing = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const verified = jwt.verify(token, "adgjmp100@");   
      if (verified) {
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
      } else {
        localStorage.clear();      
        history.push("/signin");
      }
    }
  }, []);
  useEffect(() => {
    axios.get("/product/getproducts").then((res) => {
      dispatch({ type: "ALL_PRODUCTS", payload: res.data.products });
    });
      axios.get("/category/getcategory").then((res) => {
        dispatch({ type: "GET_CATEGORIES", payload: res.data.categories })
      });  
  }, []);
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ProductComponent} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <SecuredRoute path="/cart" component={Cart} />
        <SecuredRoute path="/profile" component={Profile} />
        <SecuredRoute exact path="/admin" component={Dashboard} />
        <Route path="/admin/signin" component={Signin} />
        <Route path="/admin/signup" component={AdminSignup} />
        <SecuredRoute path="/admin/addproduct" component={AddProduct} />
        <SecuredRoute path="/admin/addcategory" component={AddCategory} />
        <SecuredRoute path="/admin/allcategories" component={AllCategories} />
        <SecuredRoute path="/admin/allproducts" component={AllProducts} />
        <SecuredRoute path="/admin/updateproduct/:id" component={UpdateProduct} />
        <SecuredRoute path="/admin/updatecategory/:id" component={UpdateCategory} />
        <Route path="/productdetails/:id" component={ProductDetails} />
        <SecuredRoute path="/checkout" component={Checkout} />
        <SecuredRoute path="/userprofile" component={UserProfile} />
        <SecuredRoute path="/userorders" component={UserOrders} />
        <Route path="/filteredproducts" component={FilteredProducts} />

        <Route exact path="/reset" component={Reset} />
        <Route path="/reset/:token" component={NewPassword} />
        <SecuredRoute path="/admin/receivedorders" component={AdminOrder} />
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
