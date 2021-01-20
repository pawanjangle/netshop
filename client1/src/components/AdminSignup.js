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
      console.log(res);
      if (res.data.message) {
        dispatch({ type: "SIGNUP_USER", payload: res });

      }
      else{
        dispatch({type: "SIGNUP_ERROR", payload: res})
      }
    });
  };
  return (
    <div className="container">
      <div className="form-group">
        <label>First Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        onClick={() => postData()}
      >
        Submit
      </button>
    </div>
  );
};

export default AdminSignup;
