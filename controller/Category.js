const Category = require("../model/Category");

const fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.send(success(200, categories));
  } catch (err) {
    res.status(400).json(err);
  }
};

const createCategory = async (req, res) => {
  const category = new Category(req.body);
  try {
    const doc = await category.save();
    res.send(success(201, doc));
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  createCategory,
  fetchCategories,
};
