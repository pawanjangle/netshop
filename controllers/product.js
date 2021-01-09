const Product = require("../models/product");
const slugify = require("slugify")
exports.createProduct = (req, res) => {
    let productPictures = [];
    const { name, price, description, category, quantity } = req.body;
    if(req.files.length>0){
       productPictures = req.files.map(file =>{
            return {img: file.filename}
        })
    }
    const newProduct = new Product({
        name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        createdBy: req.user._id,
        quantity
    });
   const product = newProduct.save((error, product)=>{
       if(error) return res.status(400).json({error});
       if(product) return res.status(200).json({product})
   });
    }