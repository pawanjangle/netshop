import React from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import "../App.css"
const Facebook = () => {
  const responseFacebook = (res) => {
    console.log(res)
    const data = {
      email: res.email,
      password: res.id,
      profilePicture: res.picture.data.url,
      fullName: res.name
    };
     if(res.accessToken){
       axios.post("/user/facebooklogin", data).then(res=>{
         console.log(res)
       })
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
