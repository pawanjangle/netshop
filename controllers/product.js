const Product = require("../models/product");
const slugify = require("slugify")
exports.createProduct = (req, res) => {
  if(req.file){
    console.log(req.file.filename);
    const { name, price, description, quantity } = req.body;
    const newProduct = new Product({
        name,
        slug: slugify(name),
        price,
        description,
        productPicture: process.env.API + "/public/" + req.file.filename,
        // createdBy: req.user._id,
        quantity
    });
    newProduct.save((error, product)=>{
       if(error) return res.status(400).json({error});
       if(product) return res.status(200).json({product, message: "Product created successfully"})
   });
  } 
    }
    exports.getProducts = async (req, res)=>{
     const products = await Product.find();
     if(products){
       return res.status(200).json({ products })
     }
    }