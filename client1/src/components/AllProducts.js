import axios from "axios";
import React, { useEffect } from "react";
import M from "materialize-css";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product);

  const deleteProduct = (id) => {
    axios
      .delete(`/product/deleteproduct/${id}`, {
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
          dispatch({ type: "DELETE_PRODUCT", payload: res.data });
        } else {
          M.toast({
            html: res.data.error,
            classes: "#f50057 pink accent-3",
            displayLength: 1000,
          });
          dispatch({ type: "DELETE_PRODUCT_FAILED", payload: res.data });
        }
      });
  }
  useEffect(() => {
    axios.get("/product/getproducts",  {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    }).then((res) => {
      dispatch({ type: "ALL_PRODUCTS", payload: res.data.products });
    });
  }, []);
  return (
    <div className="">
     <div className="d-flex align-items-center justify-content-between col-md-8"> <Link to="/admin/addproduct"><button className="btn btn-success">Add Product</button></Link>
     <h5 className="text-danger font-weight-bold">All Products</h5></div>   
      <table className="table table-hover table-dark table-responsive{-sm|-md|-lg|-xl}">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Product Image</th>
            <th scope="col" className="colspan = 2 text-center">
              Operation
            </th>
          </tr>
        </thead>
        <tbody>
          {products.products
            ? products.products.map((product, index) => {           
                return (
                  <>
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                    <Link to={`/productdetails/${product._id}`}> <td className="text-white">{product.name}</td></Link>
                      <td>
                        <img
                          src={product.productPicture}
                          alt=""
                          style={{ height: "50px" }}
                        />
                      </td>                     
                      <td>                       
                      <div className="d-flex justify-content-between flex-wrap">
                        <Link to={`/admin/updateproduct/${product._id}`}>                                          
                          <button
                            className="btn btn-warning"
                            onClick={() => {}}
                          >
                            Update
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            deleteProduct(product._id);
                          }}
                        >
                          Delete
                        </button>
                        </div> 
                      </td>                     
                    </tr>
                  </>
                );
              })
            : "loading"}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
