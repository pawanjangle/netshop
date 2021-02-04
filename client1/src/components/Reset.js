import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
import axios from "axios";
const Reset = () =>{
const history = useHistory(  );
const [ email, setEmail ] = useState( "" );
const postdata = () =>{
axios.post( "/user/reset-password", {email}).then( res=>{
    console.log(res)
    if(res.data.message){
        M.toast({html: res.data.message, classes:"#00796b teal darken-2", displayLength: 1000  })
    }
    else{
        M.toast({html: res.data.error, classes: "#f50057 pink accent-3", displayLength: 1000  })
    }
} )
}
return(
<div className="d-flex flex-column justify-content-center align-items-center">
<div className="card text-center" style={{width: "50%"}}> 
<h2 className ="brand-logo">Netshop</h2>
<input type ="text" placeholder ="email" value = {email} onChange = {(e)=>setEmail(e.target.value)}/>
<button className="btn btn-primary" onClick = {()=>postdata()}>Reset Password</button>
<h5><Link to ="/signup">Don't have an Account ?
</Link></h5>
</div>
</div>
);
}
export default Reset;