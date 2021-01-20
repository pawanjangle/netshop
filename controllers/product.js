const Product = require("../models/product");
const slugify = require("slugify")
exports.createProduct = (req, res) => {
  if(req.file){
    console.log(req.file.filename);
    const { name, price, description, quantity, category } = req.body;
    const newProduct = new Product({
        name,
        slug: slugify(name),
        price,
        description,
        category,
        productPicture: process.env.API + "/public/" + req.file.filename,
        // createdBy: req.user._id,
        quantity
    });
    newProduct.save((error, product)=>{
      console.log(error)
       if(error) return res.status(400).json({error: "failed to add product"});
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
    exports.updateProduct = async (req, res)=>{
      const {id} = req.body;
     const product = await Product.findOneByIdAndUpdate(id);
     if(product){
       return res.status(200).json({ product })
     }
    }
exports.deleteProduct= async(req, res)=>{
    console.log(req.params.id);
Product.findOne({_id: req.params.id}).exec((err, product)=>{
   if(err || !product){
       return res.status(422).json({error : err})
   }
       product.remove().then(result=>{
         console.log(result)
           return res.status(200).json({result, message: "Product Deleted successfully"})
       }).catch(err=>{
           console.log(err)
       })
})
}
     