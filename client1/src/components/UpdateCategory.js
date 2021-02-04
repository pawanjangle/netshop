import React, {useState, useEffect} from 'react'
import {useSelector} from "react-redux"
import axios from "axios";
import M from "materialize-css";
import {useParams} from "react-router-dom";
const UpdateCategory = () => {
  const {id} = useParams();
  const [categoryPicture, setCategoryPicture] = useState("");
  const [categoryName, setName] = useState("");
  useEffect(()=>{
    axios.get(`/category/getcategory/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    }).then(res=>{
      console.log(res)
      setName(res.data.category.name)
      setCategoryPicture(res.data.category.categoryImage)
    })
  }, [])
  const update = () => {   
    const form = new FormData();
    form.append("name", categoryName);      
    form.append("categoryImage", categoryPicture);
    if(categoryPicture){
      axios
      .post(`/category/updatecategory/${id}`, form,  {
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
        } else {
          M.toast({
            html: res.data.error,
            classes: "#f50057 pink accent-3",
            displayLength: 1000,
          });
        }
      });
    }    
  };
    return (
        <div>
               <h3>Update Category</h3>
      <div className="form-group">      
        <input
          type="text"
          className="form-control"
          placeholder="category name"
          value={categoryName}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="form-group">      
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
          update();
        }}
      >
        Update Category
      </button> 
        </div>
    )
}

export default UpdateCategory
