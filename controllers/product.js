const Product = require("../models/product");
const slugify = require("slugify");
exports.createProduct = async (req, res) => {
  if (req.file) {
    const { name, price, description, quantity, category } = req.body;
    const newProduct = new Product({
      name,
      slug: slugify(name),
      price,
      description,
      category,
      productPicture: req.file.location,
      // createdBy: req.user._id,
      quantity,
    });
    const product = await newProduct.save();
    if (product) {
      return res
        .status(200)
        .json({
          product,
          message: "Product created successfully",
          file: req.file,
        });
    } else {
      res.json({ error: "Failed to create Product " });
    }
  }
};
exports.getProducts = async (req, res) => {
  const products = await Product.find().sort({"createdAt": -1});
  if (products) {
    return res.status(200).json({ products });
  }
};
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
    const { name, price, description, quantity, category } = req.body;
    const newProduct = {
      name,
      price,
      description,
      category,    
      // createdBy: req.user._id,
      quantity,
    };
    if (req.file) {
      newProduct.productPicture = req.file.location
    }
    const product = await Product.findOneAndUpdate({_id : id}, newProduct, {new: true});
    if (product) {
      return res.status(200).json({message:"Product updated successfully", product });
    }
    else{
      return res.json({ error: "Failed to update product"})
    }
};
exports.deleteProduct = async (req, res) => {
  Product.findOne({ _id: req.params.id }).exec((err, product) => {
    if (err || !product) {
      return res.status(422).json({ error: err });
    }
    product
      .remove()
      .then((result) => {
        return res
          .status(200)
          .json({ result, message: "Product Deleted successfully" });
      })
      .catch((err) => {
        return res.json({ error: "Failed to delete Product" });
      });
  });
};
exports.getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (product) {
    return res.status(200).json({ product });
  } else {
    return res.json({ error: "something went wrong" });
  }
};
exports.getProductsByCategory = async (req, res)=>{
  const {category} = req.body;
const products = await Product.find({category}).sort({"price": 1})
if(products){
  res.status(200).json({products})
}
else{
  res.json({error: "something went wrong"})
}
}
exports.productDetails = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (product) {
    return res.status(200).json({ product });
  } else {
    return res.json({ error: "something went wrong" });
  }
};