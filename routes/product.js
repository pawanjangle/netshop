const express = require("express");
const router = express.Router();
const multer = require("multer");
const { requireLogin, uploadS3} = require("../middlewares/requireLogin");
const { createProduct, getProducts, updateProduct, deleteProduct, getProduct, getProductsByCategory, productDetails } = require("../controllers/product");
router.post("/create", uploadS3.single("productPicture"), createProduct);
router.get("/getproducts", getProducts);
router.delete("/deleteproduct/:id", deleteProduct);
router.post("/updateproduct/:id", requireLogin, uploadS3.single("productPicture"), updateProduct);
router.get("/getproduct/:id", requireLogin, getProduct);
router.post("/getproductsbycategory", getProductsByCategory );
router.get("/productdetails/:id", productDetails );
module.exports = router;
