import React from "react";
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
const Profile = () => {
  const user = useSelector(state=> state.auth.user)
  const renderList = ()=>{
  if(user.role === "user") {
return(
  [
    <div className="container d-flex flex-wrap justify-content-around">
    <Link to= "/userprofile"> <div className="card d-flex flex-column justify-content-center" style= {{width: "18rem"}}>
     <center> <img className="card-img-top img-fluid" src="https://image.flaticon.com/icons/png/128/3237/3237472.png" alt="" style ={{width:"50%"}} />
      <div className="card-body">
        <h5 className="card-title">Your Account</h5>        
      </div></center>
    </div>
    </Link>
   <Link to= "/userorders"><div className="card d-flex flex-column justify-content-center flex-wrap" style= {{width: "18rem"}}>
     <center><img className="card-img-top img-fluid" src="https://www.mageworx.com/media/catalog/product/1/0/10_order_management_1_2.png" alt="" style ={{width:"50%"}}/>
      <div className="card-body">
        <h5 className="card-title">Your Orders</h5>                   
      </div></center> 
    </div>
    </Link> 
  </div>
  ])}
if(user.role === "admin"){
  return (
    <div className="container d-flex flex-wrap justify-content-around">
      <Link to= "/admin/allproducts"><div className="card d-flex flex-column justify-content-center flex-wrap" style= {{width: "18rem"}}>
     <center><img className="card-img-top img-fluid" src="https://www.nicepng.com/png/detail/304-3048415_business-advice-product-icon-png.png" alt="" style ={{width:"50%"}}/>
      <div className="card-body">
        <h5 className="card-title">Products</h5>                   
      </div></center> 
    </div>
    </Link>
      <Link to= "/admin/allcategories"><div className="card d-flex flex-column justify-content-center flex-wrap" style= {{width: "18rem"}}>
     <center><img className="card-img-top img-fluid" src="https://cdn0.iconfinder.com/data/icons/category-of-words-and-phrases/128/All-512.png" alt="" style ={{width:"50%"}}/>
      <div className="card-body">
        <h5 className="card-title">Category</h5>                   
      </div></center> 
    </div>
    </Link>
    <Link to= "/userprofile"> <div className="card d-flex flex-column justify-content-center" style= {{width: "18rem"}}>
     <center> <img className="card-img-top img-fluid" src="https://image.flaticon.com/icons/png/128/3237/3237472.png" alt="" style ={{width:"50%"}} />
      <div className="card-body">
        <h5 className="card-title">Your Account</h5>        
      </div></center>
    </div>
    </Link>
   <Link to= "/admin/receivedorders"><div className="card d-flex flex-column justify-content-center flex-wrap" style= {{width: "18rem"}}>
     <center><img className="card-img-top img-fluid" src="https://www.mageworx.com/media/catalog/product/1/0/10_order_management_1_2.png" alt="" style ={{width:"50%"}}/>
      <div className="card-body">
        <h5 className="card-title">Orders</h5>                   
      </div></center> 
    </div>
    </Link> 
    
  </div>
  )
}
}
  return (
    <div>
        {renderList()}
    </div>
  );
};

export default Profile;
