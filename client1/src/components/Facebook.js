import React from "react";
import FacebookLogin from "react-facebook-login";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import M from "materialize-css";
import axios from "axios";
import "../App.css"
const Facebook = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const responseFacebook = (res) => {
    console.log(res)
    if(res.accessToken){
    const data = {
      email: res.email,
      password: res.id,
      profilePic: res.picture.data.url,
      fullName: res.name
    };
       axios.post("/user/facebooklogin", data).then(res=>{   
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
          }  else {
          M.toast({
            html: res.data.error,
            classes: "#f50057 pink accent-3",
            displayLength: 1000,
          });
          dispatch({ type: "SIGNIN_ERROR", payload: res.data });
        }
      }
       }
      ); 
    }
  };
  const componentClicked = (data) => {
    console.log(data);
  };
  return (
    <div className="col-md-6 text-center">
      <FacebookLogin
        appId="238221754592990"
        autoLoad={true}
        fields="name,email,picture"
        onClick={componentClicked}
        callback={responseFacebook}
        size= "small"      
      />
    </div>
  );
};

export default Facebook;
