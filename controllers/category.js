const Category = require("../models/category");
const slugify = require("slugify");
exports.addCategory = (req, res) => {
  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
  };
  if (req.file) {
    categoryObj.categoryImage =
    req.file.location;
  }
  const cat = new Category(categoryObj);
  cat.save((error, category) => {
    if (error) return res.status(400).json({ error: "Failed to add category" });
    if (category) return res.status(201).json({message: "Category added successfully", file: req.file});
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
exports.updateCategory= async (req, res)=>{
const {id} = req.params;
const categoryObj = {
  name: req.body.name,
  slug: slugify(req.body.name),
};
if (req.file) {
  categoryObj.categoryImage =
  req.file.location;
}
const updatedCategory = await Category.findOneAndUpdate({_id: id}, categoryObj, {new: true});
if(updatedCategory){
  return res.status(200).json({message: "Category updated successfully", updatedCategory })
}
else{
  return res.json({error: "Failed to update category"})
}
}
exports.getCategory = async (req, res)=>{
  const {id} = req.params;
  const category = await Category.findOne({_id: id});
  if(category){
    return res.status(200).json({category})
  }
  else{
    return res.json({error: "something went wrong"})
  }
}
