import React, {useState, useEffect} from "react";
import {useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Signin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(state=>state.auth.token)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postData = () => {
    const data = {  email, password };
    axios.post("/user/signin", data).then((res) => {
      if (res.data.message) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user);
        history.push("/");
        dispatch({ type: "SIGNIN_USER", payload: {
          user: res.data.user,
          token: res.data.token,
          message: res.data.message
        } });     
      }
      else{
        dispatch({type: "SIGNIN_ERROR", payload: res})
      }
    });
  };
  return (
    <div className="container">
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
          <input type="password" className="form-control" placeholder="Password" 
               onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={() => postData()}>
          Submit
        </button>
    </div>
  );
};

export default Signin;
