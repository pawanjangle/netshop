import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Facebook from "./Facebook";
import Google from "./Google";
import axios from "axios";
import M from "materialize-css";
import Slide from "react-reveal/Slide";
const Signin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postData = () => {
    const data = { email, password };
    axios.post("/user/signin", data).then((res) => {
      if (res.data.message) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user);
        if (res.data.user.role === "user") {
          history.push("/");
          axios
            .get("/cart/getcartitems", {
              headers: {
                Authorization: "bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              console.log(res.data);
              dispatch({ type: "GET_CARTITEMS", payload: res.data });
            });
          dispatch({
            type: "SIGNIN_USER",
            payload: {
              user: res.data.user,
              token: res.data.token,
              message: res.data.message,
            },
          });
          M.toast({
            html: res.data.message,
            classes: "#00796b teal darken-2",
            displayLength: 1000,
          });
        } else {
          dispatch({
            type: "SIGNIN_USER",
            payload: {
              user: res.data.user,
              token: res.data.token,
              message: res.data.message,
            },
          });
          M.toast({
            html: res.data.message,
            classes: "#00796b teal darken-2",
            displayLength: 1000,
          });
          history.push("/admin");
        }
      } else {
        M.toast({
          html: res.data.error,
          classes: "#f50057 pink accent-3",
          displayLength: 1000,
        });
        dispatch({ type: "SIGNIN_ERROR", payload: res.data });
      }
    });
  };
  return (
    <div className="container-fluid d-flex justify-content-center flex-wrap">
      <div className="card col-md-8 d-flex flex-column">
        <h4 className="text-center logo">NETSHOP</h4>
        <Slide right>
          <div className="d-flex justify-content-around">
            <div className="bg-secondary p-2 text-white">
              <p>User Dummy credentials</p>
              <p>email: pawan@gmail.com</p>
              <p className>password: 123456</p>
            </div>
            <div className="bg-secondary p-2 text-white">
              <p>Admin Dummy credentials</p>
              <p>email: pawan1@gmail.com</p>
              <p className>password: 123456</p>
            </div>
          </div>

          <h5 className="font-weight-bold text-danger text-center">
            SIGNIN FORM
          </h5>
          <div className="d-flex flex-column align-items-center">
            <div className="form-group col-md-8">
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group col-md-8">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="Signin"
                className="btn btn-primary"
                onClick={() => postData()}
              >
                Submit
              </button>
            </div>
            <h6 className="mt-4">
              <Link to="/reset">Forgot Password ?</Link>
            </h6>
            <h5>
              <Link to="/signup">Don't have an Account ?</Link>
            </h5>
            <div className="d-flex justify-content-center align-items-center flex-wrap">
              <Facebook />
              <Google />
            </div>
            </div>
          </Slide>      
      </div>
    </div>
  );
};

export default Signin;
