import React, { useEffect } from "react";
import {useSelector} from "react-redux"
import axios from "axios";
const Profile = () => {
    const user = useSelector(state => state.auth.user)
  return (
    <div>
      <div className="container d-flex flex-wrap justify-content-around">
        <div className="card d-flex flex-column justify-content-center flex-wrap" style= {{width: "18rem"}}>
         <center> <img className="card-img-top img-fluid" src="https://lh3.googleusercontent.com/proxy/X_NAuutv3f6c_cm3heqIBAesm5QMW5DUlm6KZkX1Ngnu-BTWCOj35_mNs4clCWnO8cOs-2hQ1wVmcPQXNa_IghfTxgRq-NqUsjenbLQ0pYlhTVebmM5o" alt="Card image cap" style ={{width:"50%"}} />
          <div className="card-body">
            <h5 className="card-title">Your Account</h5>        
          </div></center>
        </div>
        <div className="card d-flex flex-column justify-content-center flex-wrap" style= {{width: "18rem"}}>
         <center><img className="card-img-top img-fluid" src="https://www.mageworx.com/media/catalog/product/1/0/10_order_management_1_2.png" alt="Card image cap" style ={{width:"50%"}}/>
          <div className="card-body">
            <h5 className="card-title">Your Orders</h5>                   
          </div></center> 
        </div>
      </div>
    </div>
  );
};

export default Profile;
