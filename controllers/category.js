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
    if (error) return res.status(400).json({ error });
    if (category) return res.status(201).json({ category });
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
