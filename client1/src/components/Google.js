import React from "react";
import GoogleLogin from "react-google-login";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import M from "materialize-css";
import axios from "axios";
const Google = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const responseGoogle = (res) => {
    console.log(res)
    const data = {
      email: res.profileObj.email,
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      password: res.profileObj.googleId,
      profilePicture: res.profileObj.imageUrl
    };
    if (res.accessToken.length > 0) {
axios.post("/user/googlelogin", data).then(res=>{
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
})
    }
  };
  return (
    <div className="col-md-6 text-center">
      <GoogleLogin
        clientId="656155426164-p6dqate1336u6bh58nif35jedt5ikbpg.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        buttonText = "Login with Google"
      />
    </div>
  );
};

export default Google;
