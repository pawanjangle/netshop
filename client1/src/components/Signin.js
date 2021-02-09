import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Facebook from "./Facebook";
import Google from "./Google";
import axios from "axios";
import M from "materialize-css";
import Slide from 'react-reveal/Slide';
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
    <div className="container-fluid d-flex justify-content-center p-4">
      <div className="card d-flex flex-column justify-content-center align-items-center col-md-8 flex-wrap py-4">
        <h4 className="text-center logo">NETSHOP</h4>
        <Slide right><h5 className="text-center font-weight-bold text-danger">
          SIGNIN FORM
        </h5>
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
        <button
          type="Signin"
          className="btn btn-primary"
          onClick={() => postData()}
        >
          Submit
        </button>
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
        </Slide>
      </div>
    </div>
  );
};

export default Signin;
