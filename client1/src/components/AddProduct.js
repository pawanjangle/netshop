import React, { useState, useEffect } from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux"
const AddProduct = () => {
  const [productPicture, setProductPicture] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectCategory, setCategory] = useState("")
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const categories = useSelector(state => state.category.categories)
  useEffect(()=>{
  axios.get("/category/getcategory").then((res) => {
    console.log(res)
    dispatch({ type: "GET_CATEGORIES", payload: res.data.categories });
  });
}, []);
  const dispatch = useDispatch();
  const postProduct = () => {
    if (productPicture) {
      const form = new FormData();  
      form.append("description", description);
      form.append("name", product);
      form.append("quantity", quantity);
      form.append("price", price);
      form.append("category", selectCategory);
      form.append("productPicture", productPicture);
      console.log(form)
      axios.post("/product/create", form).then((res) => {
        if(res.data.message){
          dispatch({ type: "ADD_PRODUCT", payload: res.data.message})
        }
       if(res.data.error){
        dispatch({ type: "ADD_PRODUCT_ERROR", payload: res.data.error})
       }
      });
    }
  };
  return (
 
    <div className= "container" style={{width: "50%"}}>
        <div className="form-group">
          <label>Product</label>
          <input
            type="text"
            className="form-control"
            placeholder="Product name"
            onChange={(e) => {
              setProduct(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            placeholder="Price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="text"
            className="form-control"
            placeholder="quantity"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
    <label>Select Category</label>
    <select className="form-control" onChange={(e)=>{
        setCategory(e.target.value)}}>
      {categories ? categories.map(category=>{
        return <>
      <option 
      >{category.name}</option>  
        </>
      }): "loading"}
    </select>
  </div>
        <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            className="form-control-file"
            name="productPicture"
            onChange={(e) => {
              setProductPicture(e.target.files[0]);
            }}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            postProduct();
          }}
        >
          Add Product
        </button>
    </div>
  );
};

export default AddProduct;
