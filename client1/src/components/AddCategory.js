import React, {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux"
const AddCategory = () => {
  const [categoryPicture, setCategoryPicture] = useState("");
  const [categoryName, setName] = useState("");
 const dispatch = useDispatch()
  const postCategory = ()=>{
    if (categoryPicture) {
        const form = new FormData();
        form.append("name", categoryName);      
        form.append("categoryImage", categoryPicture);
        axios.post("/category/create", form, {
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
          },
        }).then((res) => {
          if(res.data.message){
            dispatch({ type: "ADD_Category", payload: res.data.message})
          }
          if(res.data.error){
            dispatch({ type: "ADD_CATEGORY_ERROR", payload: res.data.error })
          }
        });
      }
  }
  return (
    <div>
      <h3>Add Category</h3>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="category name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <label>Product Image</label>
        <input
          type="file"
          className="form-control-file"
          onChange={(e) => {
            setCategoryPicture(e.target.files[0]);
          }}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          postCategory();
        }}
      >
        Add Category
      </button>
    </div>
  );
};

export default AddCategory;
