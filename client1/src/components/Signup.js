import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import M from "materialize-css"
const Signup = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postData = () => {
    const data = { firstName, lastName, email, password };
    axios.post("/user/signup", data).then((res) => {
      if (res.data.message) {
        dispatch({ type: "SIGNUP_USER", payload: res.data });
        M.toast({html: res.data.message, classes:"#00796b teal darken-2", displayLength: 1000 })
      }
      else{
        M.toast({html: res.data.error, classes: "#f50057 pink accent-3", displayLength: 1000  })
        dispatch({type: "SIGNUP_ERROR", payload: res.data})
      }
    });
  };
  return (
    <div className="d-flex flex-column Justify-content-center align-items-center">
    <div className="card p-5" style={{ width: "50%"}}>
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
    </div>
  );
};

export default Signup;
