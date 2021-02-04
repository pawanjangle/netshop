import React, { useState, useEffect } from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import M from "materialize-css";
const UpdateProduct = () => {
    const {id} = useParams();
  const [productPicture, setProductPicture] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectCategory, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const categories = useSelector((state) => state.category.categories);
  console.log(selectCategory)
  useEffect(() => {
    axios.get(`/product/getproduct/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      console.log(res)
      const {productPicture, name, quantity,category,price, description} = res.data.product;
      setProductPicture(productPicture);
      setProduct(name)
      setQuantity(quantity)
      setCategory(category)
      setPrice(price)
      setDescription(description)
    });
  }, []);
  const dispatch = useDispatch();
  const updateProduct = () => {
    if (productPicture) {
      const form = new FormData();
      form.append("description", description);
      form.append("name", product);
      form.append("quantity", quantity);
      form.append("price", price);
      form.append("category", selectCategory);
      form.append("productPicture", productPicture);     
      axios.post(`/product/updateproduct/${id}`, form, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("token"),
        },
      }).then((res) => {
        console.log(res)
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
    <div className="container" style={{ width: "50%" }}>
      <div className="form-group">
        <label>Product</label>
        <input
          type="text"
          className="form-control"
          placeholder="Product name"
          value= {product}
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
          value = {description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <div className="d-flex justify-content-between">
        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            className="form-control"
            placeholder="Price"
            value = {price}
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
            value = {quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <div className="form-group">
          <label>Select Category</label>
          <select
            className="form-control"
            value = {selectCategory}
            onChange={(e) => {
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
      </div>
    <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          updateProduct();
        }}
      >
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;

