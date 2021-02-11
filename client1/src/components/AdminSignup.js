import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {useHistory} from "react-router-dom";
import M from "materialize-css";
const AdminSignup = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postData = () => {
    const data = { firstName, middleName, lastName, email, password };
    axios.post("/admin/signup", data).then((res) => {
      if (res.data.message) {
        M.toast({
          html: res.data.message,
          classes: "#00796b teal darken-2",
          displayLength: 1000,
        });
        dispatch({ type: "SIGNUP_USER", payload: res });
        history.push("/signin")
      } else {
        M.toast({
          html: res.data.error,
          classes: "#f50057 pink accent-3",
          displayLength: 1000,
        });
        dispatch({ type: "SIGNUP_ERROR", payload: res });
      }
    });
  };
  return (
    <div className="container fluid d-flex justify-content-center mt-3">
      <div className="card col-md-6">
        <h4 className="text-center font-weight-bold text-danger">ADMIN SIGNUP FORM</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Middle Name"
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn" onClick={() => postData()}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSignup;
