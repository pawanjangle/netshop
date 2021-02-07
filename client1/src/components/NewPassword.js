import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import M from "materialize-css";
import axios from "axios";
const NewPassword = () => {
  const [newPassword, setPassword] = useState("");
  const history = useHistory();
  const { token } = useParams();
  const logindata = () => {
    axios
      .post("/user/new-password", { newPassword, sentToken: token })
      .then((res) => {
        if (res.data.message) {
            M.toast({
                html: res.data.message,
                classes: "#00796b teal darken-2",
                displayLength: 1000,
              });
          history.push("/signin");
        } else {
            M.toast({
                html: res.data.error,
                classes: "#f50057 pink accent-3",
                displayLength: 1000,
              });
        }
      });
  };
  return (
    <div className="container fluid d-flex justify-content-center mt-4">
      <div className="card text-center col-md-6 p-4">
        <h4 className="logo">NETSHOP</h4>
        <input
          type="password"
          placeholder="Enter a new password"
          value={newPassword}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-center">
          <button
            className="waves-effect waves-light btn 64b5f6 blue lighten-2 white-text"
            onClick={() => logindata()}
          >
            Update Password
          </button>
        </div>
        <h5>
          <Link to="/signup">Don't have an Account ?</Link>
        </h5>
      </div>
    </div>
  );
};
export default NewPassword;
