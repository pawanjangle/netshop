const express = require("express");
const router = express.Router();
const multer = require("multer");
const shortId = require("shortId");
const { requireLogin, adminMiddleware} = require("../middlewares/requireLogin");
const { createProduct } = require("../controllers/product");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate() + '-' + file.originalname)
    }
  });
  const upload = multer({storage});
router.post("/create", requireLogin, adminMiddleware, upload.array("productPicture"), createProduct);
module.exports = router;