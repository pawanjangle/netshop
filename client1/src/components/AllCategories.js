import axios from "axios";
import React, { useState, useEffect } from "react";
import {Redirect, Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
const AllCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category);
  useEffect(() => {
    axios.get("/category/getcategory").then((res) => {
      dispatch({ type: "GET_CATEGORIES", payload: res.data.categories });
    });
  }, []);
  const deleteCategory = (id) => {
    axios
      .delete(`/category/deletecategory/${id}`, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.message) {
          M.toast({
            html: res.data.message,
            classes: "#00796b teal darken-2",
            displayLength: 1000,
          });
          dispatch({ type: "DELETE_CATEGORY", payload: res.data });
        } else {
          M.toast({
            html: res.data.error,
            classes: "#f50057 pink accent-3",
            displayLength: 1000,
          });
          dispatch({ type: "DELETE_CATEGORY_FAILED", payload: res.data });
        }
      });
  };
  return (
    <div className="mt-3">
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Category Image</th>
            <th scope="col" className="colspan = 2">
              Operation
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.categories.map((category) => {
            return (
              <>
                <tr>
                  <th scope="row">1</th>
                  <td>{category.name}</td>
                  <td>
                    <img
                      src={category.categoryImage}
                      alt=""
                      style={{ height: "50px" }}
                    />
                  </td>
                  <td>
                   <Link to ={`/admin/updatecategory/${category._id}`}> <button
                      className="btn btn-warning"                    
                    >
                      Update
                    </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteCategory(category._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllCategories;
