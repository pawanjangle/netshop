import React from 'react'
import {useSelector} from "react-redux"
const Header = () => {
    const products = useSelector((state) => state.product.products);
    console.log(products)
    return (
        <div>

        </div>
    )
}

export default Header
