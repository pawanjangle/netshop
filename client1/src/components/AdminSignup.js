import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
const AdminSignup = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postData = () => {
    const data = { firstName, lastName, email, password };
    axios.post("/admin/signup", data).then((res) => {
      if (res.data.message) {
        dispatch({ type: "SIGNUP_USER", payload: res });
      } else {
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
