import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const AllProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  console.log(products)
  const deleteProduct = (id)=>{
    axios.delete(`/product/deleteproduct/${id}`, {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    },
 ).then(res=>{
    })
}
  useEffect(() => {
    axios.get("/product/getproducts").then((res) => {
      dispatch({ type: "ALL_PRODUCTS", payload: res.data.products });
    });
  }, []);
  const updateProduct = (id)=>{
    console.log(id)
    axios.delete("/updateproduct", id,  {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
      },
    }).then(res=>{
        console.log(res)
    })
}

  return (
    <div className="mt-3">
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Product Image</th>
            <th scope="col" className="colspan = 2">
              Operation
            </th>
          </tr>
        </thead>
        <tbody>
          {products ? products.map((product, index) => {
            return (
              <>
                <tr key = {index}>
                  <th scope="row">1</th>
                  <td>{product.name}</td>
                  <td>
                    <img
                      src={product.productPicture}
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
                        deleteProduct(product._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </>
            );
          }) : "loading"}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;

