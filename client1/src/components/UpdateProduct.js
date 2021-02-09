import React, { useState, useEffect } from "react";
import axios from "axios";
import {useParams, useHistory} from "react-router-dom";
import { useSelector } from "react-redux";
import M from "materialize-css";
const UpdateProduct = () => {
  const history = useHistory();
    const {id} = useParams();
  const [productPicture, setProductPicture] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [selectCategory, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const categories = useSelector((state) => state.category.categories);
  useEffect(() => {
    axios.get(`/product/getproduct/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      const {productPicture, name, quantity,category,price, description} = res.data.product;
      setProductPicture(productPicture);
      setProduct(name)
      setQuantity(quantity)
      setCategory(category)
      setPrice(price)
      setDescription(description)
    });
  }, []);
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
        if (res.data.message) {
          history.push("/admin/allproducts")
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
    <div className="container-fluid d-flex justify-content-center mt-3" >
      <div className="card col-md-6 p-4">   
      <h4 className="text-center text-danger font-weight-bold">UPDATE PRODUCT FORM</h4>
      <div className="form-group">
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
      <div className="d-flex justify-content-between align-items-center">
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
      <div className="text-center">
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
    </div>
    </div>
  );
};

export default UpdateProduct;

