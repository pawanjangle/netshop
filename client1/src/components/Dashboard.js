import React from "react";
import Profile from "./Profile";
import Roll from "react-reveal/Roll";
const Dashboard = () => {
  return (
    <div>
      <Roll>
        <Profile />
      </Roll>
    </div>
  );
};

export default Dashboard;
