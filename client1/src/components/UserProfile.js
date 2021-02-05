import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import M from "materialize-css";
const UserProfile = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [mob, setMob] = useState("");
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (image) {
      const form = new FormData();
      form.append("pic", image);
      axios
        .post("/user/setprofilepic", form, {
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if(res.data.message){
         dispatch({type: "UPDATE_PROFILEPIC", payload: res.data})
            M.toast({
              html: res.data.message,
              classes: "#00796b teal darken-2",
              displayLength: 1000,
            });
          }
          else{
            M.toast({
              html: res.data.error,
              classes: "#f50057 pink accent-3",
              displayLength: 1000,
            });
          }          
        });
    }
  }, [image]);
  const updateMobileNo = ()=>{
    axios.post("user/updatemob", {mob},{
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    }).then(res=>{
      if(res.data.message){
        M.toast({
          html: res.data.message,
          classes: "#00796b teal darken-2",
          displayLength: 1000,
        });
        dispatch({type: "UPDATE_MOB_NO", payload: res.data})      
      }
      else{
        M.toast({
          html: res.data.error,
          classes: "#f50057 pink accent-3",
          displayLength: 1000,
        });     
      }
    })
  }
  return (
    <div className="container-fluid d-flex justify-content-center mt-5">
      <div className="card py-3">
      <div className="d-flex">
        <div className="d-flex flex-column justify-content-center col-md-6 align-items-center">
          <img
            className="img-fluid"
            src={user.profilePic}
            alt=""
            style={{ maxHeight: "200px" }}
          />
          <div className="file-field input-field">
            <div className="btn">
              <span>set Profile Picture</span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column col-md-6 justify-content-center">
          <h6>Name:</h6>
        {user.fullName ? <p>{user.fullName}</p> : <p>{user.firstName} {user.middleName} {user.lastName}</p>}
         <h6>Email:</h6> <p> {user.email}</p>
         <h6>Mob. No:</h6>
         {user.contactNumber ? (<div><p>{user.contactNumber}</p> 
          <input placeholder="Enter 10 digit Mobile No." onChange={(e)=>{
          setMob(e.target.value)}}/> <button className="btn" onClick={()=>{
            updateMobileNo()
          }}>Update Mobile No.</button></div>)
         : (
           <div>
        <div className="text-center"><input placeholder="Enter 10 digit Mobile No." onChange={(e)=>{
          setMob(e.target.value)
        }}/>
         <button className="btn" onClick={()=>{
           updateMobileNo()
         }}>ADD Mobile No.</button></div> 
         </div>)}
        </div>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
