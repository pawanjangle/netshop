import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {useHistory} from "react-router-dom";
import axios from "axios";
import M from "materialize-css";
import {Link} from "react-router-dom"
import Slide from 'react-reveal/Slide';
const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postData = () => {
    const data = {
      firstName,
      lastName,
      middleName,
      contactNumber,
      email,
      password,
    };
    axios.post("/user/signup", data).then((res) => {
      if (res.data.message) {
        history.push("/signin")
        dispatch({ type: "SIGNUP_USER", payload: res.data });
        M.toast({
          html: res.data.message,
          classes: "#00796b teal darken-2",
          displayLength: 1000,
        });
      } else {
        M.toast({
          html: res.data.error,
          classes: "#f50057 pink accent-3",
          displayLength: 1000,
        });
        dispatch({ type: "SIGNUP_ERROR", payload: res.data });
      }
    });
  };
  return (
    <div className="container-fluid d-flex justify-content-center p-4">
      <div className="card col-md-8">
      <h4 className="text-center logo">NETSHOP</h4>
        <Slide left><h5 className="text-center text-danger font-weight-bold">SIGNUP FORM</h5>
        <div className="d-flex justify-content-around flex-wrap">
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Middle Name"
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-around flex-wrap">
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Mobile No."
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="d-flex justify-content-around flex-wrap">
          <div className="form-group col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group col-md-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="text-center">
          <button
            className="btn waves-effect waves-light"
            onClick={() => postData()}
          >
            Signup
          </button>
        </div>
        <h5 className="text-center">
          <Link to="/signin">Already have an Account ?</Link>
        </h5>
       </Slide>
      </div>
    </div>
  );
};

export default Signup;
