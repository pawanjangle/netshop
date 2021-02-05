import React, {useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux"
import M from "materialize-css";
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
            M.toast({html: res.data.message, classes: "#00796b teal darken-2", displayLength: 1000  })
          }
         else{
          M.toast({html: res.data.error, classes: "#f50057 pink accent-3", displayLength: 1000  })     
         }
        });
      }
  }
  return (
    <div className="container-fluid d-flex justify-content-center mt-3">
      <div className="card col-md-6 p-4 d-flex flex-column justify-content-center">
      <h3>Add Category</h3>
      <div className="form-group">     
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
      <div className="text-center">
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
      </div>
    </div>
  );
};

export default AddCategory;
