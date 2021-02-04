import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch} from "react-redux";
import axios from "axios";
const NewPassword = () =>{
const [ newPassword, setPassword ] = useState( "" );
const dispatch = useDispatch()
const {token} = useParams();
const logindata = () =>{
axios.post("/user/new-password", {newPassword,
    sentToken: token}).then(res =>{
          console.log(res)
// if( res.error ){
// M.toast( { html: data.error, classes: "#ff1744 red accent-3" } )
// }
// else{
//     M.toast( { html: res.message, classes: "#ff1744 green accent-3" } );
//     history.push("/login");
// }
} )
}
return(
<div className = "my-card">
<div className="card auth-card input-field"> 
<h2 className ="brand-logo">Instagram</h2>
<input type ="password" placeholder ="Enter a new password" value = { newPassword } onChange = {( e )=>setPassword( e.target.value )}
/>
<button className="waves-effect waves-light btn 64b5f6 blue lighten-2 white-text" onClick = { (  )=>logindata(  )}>Update Password</button>
<h5><Link to ="/signup">Don't have an Account ?
</Link></h5>
</div>
</div>
);
}
export default NewPassword;