import React, {useState, useEffect} from 'react'
import {useParams} from "react-router-dom";
import axios from "axios"
import {useSelector} from "react-redux"
const ProductDetails = () => {
    const [product, setProduct] = useState("")
const {id} = useParams();
useEffect(()=>{
axios.get(`/product/productdetails/${id}`).then(res=>{
   if(res.data.product){
       setProduct(res.data.product);
   }
})
}, [])
    return (
        <div>           
            <div className="container-fluid">
        <div className="card p-3">
        <div className="d-flex flex-wrap align-items-center">
            <div className="col-md-3 text-center">
                <img src={product.productPicture} style = {{width: "60%"}} alt=""/>
            </div>
            <div className="d-flex flex-column col-md-9 justify-content-center align-items-center">
                <h5>{product.name}</h5>
               <h6>{product.description}</h6> 
               <h4>Price: ₹ {product.price}</h4>        
            <button className="btn btn-primary">Add to cart</button>          
            </div>         
        </div>
        </div>
        </div>
        </div>
    )
}
export default ProductDetails
