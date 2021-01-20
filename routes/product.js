const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortId = require("shortId");
const { requireLogin, adminMiddleware, userMiddleware} = require("../middlewares/requireLogin");
const { createProduct, getProducts, updateProduct, deleteProduct } = require("../controllers/product");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate() + '-' + file.originalname)
    }
  });
  const upload = multer({storage});
router.post("/create", upload.single("productPicture"), createProduct);
router.get("/getproducts", getProducts);
router.delete("/deleteproduct/:id", deleteProduct);
router.put("/updateproduct/:id", updateProduct);
module.exports = router;
