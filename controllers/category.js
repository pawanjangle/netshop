const Category = require("../models/category");
const slugify = require("slugify");
exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.file) {
    categoryObj.categoryImage =
      process.env.API + "/public/" + req.file.filename;
  }
  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error: "Failed to add category" });
    if (category) return res.status(201).json({message: "Category added successfully"});
  });
};
exports.getCategories = (req, res) => {
  Category.find((error, categories) => {
    if (error) res.status(400).json({ error });
    if (categories) {
      return res.status(201).json({ categories });
    }
  });
};
exports.deleteCategory= async(req, res)=>{
  console.log(req.params.id);
Category.findOne({_id: req.params.id}).exec((err, category)=>{
 if(err || !category){
     return res.status(422).json({error : err})
 }
     category.remove().then(result=>{
       console.log(result)
         return res.status(200).json({result, message: "category Deleted successfully"})
     }).catch(err=>{
         console.log(err)
     })
})
}
