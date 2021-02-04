import axios from 'axios';
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
const NewArrivals = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        axios.get("/product/getproducts").then((res) => {
          dispatch({ type: "ALL_PRODUCTS", payload: res.data.products });
        });
      }, []);
    const products = useSelector((state) => state.product.products);
    console.log(products)
    return (
        <div>
         <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img className="d-block w-100" src= "https://www.mageworx.com/media/catalog/product/1/0/10_order_management_1_2.png" alt="First slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="..." alt="Second slide"/>
    </div>
    <div className="carousel-item">
      <img className="d-block w-100" src="..." alt="Third slide"/>
    </div>
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
        </div>
    )
}

export default NewArrivals