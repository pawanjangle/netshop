import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const AllCategories = () => {
  const [ deletecategory, setDelete] = useState(true)
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  console.log(categories);
  useEffect(() => {
    axios.get("/category/getcategory").then((res) => {
      dispatch({ type: "GET_CATEGORIES", payload: res.data.categories });
    });
  }, [deletecategory]);
  const deleteCategory = (id)=>{
  axios.delete(`/category/deletecategory/${id}`, {
    headers: {
      Authorization: "bearer " + localStorage.getItem("token"),
    },
  },
).then(res=>{
  if(res.data.message){
    setDelete(!deletecategory);
  }
  })
}
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
          {categories.map((category) => {
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
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        // updateCategory(category._id);
                      }}
                    >
                      Update
                    </button>
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
