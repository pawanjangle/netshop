import React, {useState, useEffect} from "react";
import {useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import M from "materialize-css"
const Signin = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector(state=>state.auth.token)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const postData = () => {
    const data = {  email, password };
    axios.post("/user/signin", data).then((res) => {
      console.log(res)
      if (res.data.message) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", res.data.user);
        if(res.data.user.role ==="user"){
          history.push("/");
          axios.get("/cart/getcartitems", {
            headers: {
              Authorization: "bearer " + localStorage.getItem("token"),
            },
          }).then((res) => {
            console.log(res.data)
            dispatch({ type: "GET_CARTITEMS", payload: res.data });
          });
          dispatch({ type: "SIGNIN_USER", payload: {
            user: res.data.user,
            token: res.data.token,
            message: res.data.message,
          }});
          M.toast({html: res.data.message, classes:"#00796b teal darken-2", displayLength: 1000  })
        }
        else{
          dispatch({ type: "SIGNIN_USER", payload: {
            user: res.data.user,
            token: res.data.token,
            message: res.data.message,           
          }});
          M.toast({html: res.data.message, classes: "#00796b teal darken-2", displayLength: 1000  })
          history.push("/admin")
        }          
      }
      else{
        M.toast({html: res.data.error, classes: "#f50057 pink accent-3", displayLength: 1000  })
        dispatch({type: "SIGNIN_ERROR", payload: res.data})
      }
    });
  };
  return (
    <div className="d-flex flex-column Justify-content-center align-items-center">
       <div className="card p-5" style={{ width: "50%"}}>
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
    </div>
  );
};

export default Signin;
