import React, { useState } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import axios from "axios";
const Reset = () => {
  const [email, setEmail] = useState("");
  const postdata = () => {
    axios.post("/user/reset-password", { email }).then((res) => {
      if (res.data.message) {
        M.toast({
          html: res.data.message,
          classes: "#00796b teal darken-2",
          displayLength: 1000,
        });
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
    <div className="d-flex justify-content-center m-4">
      <div className="card text-center col-md-6 p-4">
        <h4 className="brand-logo logo font-weight-bold">NETSHOP</h4>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="text-center">
          <button className="btn btn-primary" onClick={() => postdata()}>
            Reset Password
          </button>
        </div>
        <h5>
          <Link to="/signup">Don't have an Account ?</Link>
        </h5>
      </div>
    </div>
  );
};
export default Reset;
