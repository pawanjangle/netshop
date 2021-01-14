import React, { useState } from "react";
import axios from "axios";
import {useDispatch} from "react-redux"
const AddProduct = () => {
  const [productPicture, setProductPicture] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const postProduct = () => {
    if (productPicture) {
      const form = new FormData();
      form.append("description", description);
      form.append("name", product);
      form.append("quantity", quantity);
      form.append("price", price);
      form.append("productPicture", productPicture);
      axios.post("/product/create", form).then((res) => {
        console.log(res)
        dispatch({ type: "ADD_PRODUCT", payload: res.data})
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
