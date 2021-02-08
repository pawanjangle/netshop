import React, { useEffect } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";
import Profile from "./Profile";
import { useDispatch } from "react-redux";
import Roll from 'react-reveal/Roll';
const Dashboard = () => {
  const dispatch = useDispatch();
  return (
   <div>
     <Roll> 
     <Profile/>
     </Roll> 
     </div> 
  );
};

export default Dashboard;
