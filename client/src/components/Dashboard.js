import React from 'react'
import AdminNavbar from "./AdminNavbar";
import AddProduct from "./AddProduct";
const Dashboard = () => {
    return (
        <div className="container">
            <AdminNavbar/>   
            <AddProduct/>
        </div>
    )
}

export default Dashboard
