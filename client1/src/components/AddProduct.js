import React, { useState, useEffect } from "react";
import axios from "axios";
import {  useSelector, useDispatch } from "react-redux";
import M from "materialize-css";
const AddProduct = () => {
  const [productPicture, setProductPicture] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectCategory, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();
  useEffect(()=>{
    axios.get("/category/getcategory").then((res) => {
      dispatch({ type: "GET_CATEGORIES", payload: res.data.categories })
    });  
  }, [])
  const postProduct = () => {
    if (productPicture) {
      const form = new FormData();
      form.append("description", description);
      form.append("name", product);
      form.append("quantity", quantity);
      form.append("price", price);
      form.append("category", selectCategory);
      form.append("productPicture", productPicture);
      axios.post("/product/create", form).then((res) => {
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
    <div className="container-fluid d-flex justify-content-center m-3">
      <div className="card col-md-6">
        <h4 className="text-center text-danger font-weight-bold">ADD PRODUCT FORM</h4>
      <div className="form-group">
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
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className="d-flex justify-content-between">
        <div className="form-group">
          <input
            type="number"
            className="form-control"
            placeholder="Price in ₹"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="quantity in stock"
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="form-group">
          <label>Select Category</label>
          <select
            className="form-control"  onClick={(e) => {
              setCategory(e.target.value);
            }}        
          >
            {categories
              ? categories.map((category) => {
                  return (
                    <>
                      <option>{category.name}</option>
                    </>
                  );
                })
              : "loading"}
          </select>
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control-file"
            name="productPicture"
            onChange={(e) => {
              setProductPicture(e.target.files[0]);
            }}
          />
        </div>
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
    </div>
  );
};

export default AddProduct;
