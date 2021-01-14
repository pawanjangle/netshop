import React, {useEffect} from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import Home from "./components/Home";
import NavbarComponent from "./components/NavbarComponent";
import AddProduct from "./components/AddProduct";
import Dashboard from "./components/Dashboard";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import {useDispatch, useSelector} from "react-redux"
const Routing = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
        <Route path="/profile" component={Profile} />      
        <Route path="/admin" component={Dashboard} />
        <Route path="/admin/signin" component={Signin} />
        <Route path="/admin/addproduct" component={AddProduct} />
      </Switch>
    </div>
  );
};
function App() {
  const dispatch = useDispatch()
  const history = useHistory();
  //  const user = localStorage.getItem("user");
  useEffect(()=>{
    const token = localStorage.getItem("token");  
    if(token){
      dispatch({ type: "SIGNIN_USER", payload: {
     token
      } })
    } 
  }, []);
   
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
