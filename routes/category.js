const express = require("express");
const router = express.Router();
const { requireLogin, adminMiddleware} = require("../middlewares/requireLogin");
const { addCategory, getCategories, deleteCategory } = require("../controllers/category");
const multer = require("multer");
const shortId = require("shortid");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, shortId.generate() + '-' + file.originalname)
    }
  });
  const upload = multer({storage});
router.post("/create", requireLogin, adminMiddleware, upload.single("categoryImage"), addCategory);
router.get("/getcategory", getCategories);
router.delete("/deletecategory/:id", requireLogin, deleteCategory);
module.exports = router;