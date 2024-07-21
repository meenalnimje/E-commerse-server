const Product = require("../model/Product");
const { success } = require("../utilies/responseWrapper");

const createProduct = async (req, res) => {
  const product = req.body;
  product.discountPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100)
  );
  try {
    const newProduct = new Product(product);
    const doc = await newProduct.save(); // object
    res.send(success(201, doc)); // object
  } catch (err) {
    res.status(400).json(err);
  }
};

const fetchAllProducts = async (req, res) => {
  try {
    let query = Product.find({ deleted: { $ne: true } });
    if (req.query.category) {
      query = query.find({ category: req.query.category });
    }
    if (req.query.brand) {
      query = query.find({ brand: req.query.brand });
    }
    if (req.query._page && req.query._limit) {
      let pageLimit = parseInt(req.query._limit);
      let page = parseInt(req.query._page);
      query = query.skip(pageLimit * (page - 1)).limit(pageLimit);
    }
    if (req.query._sort && req.query._order) {
      let sortOrder = req.query._order === "desc" ? -1 : 1;
      query = query.sort({ [req.query._sort]: sortOrder });
    }
    let docs = await query.exec();
    res.send(success(200, docs));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const fetchProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.send(success(200, product));
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(success(200, product));
  } catch (err) {
    res.status(400).json(err);
  }
};

const fetchTotalProductNumber = async (req, res) => {
  // this is for admin

  try {
    let product = await Product.find({ deleted: { $ne: true } });
    const totalProductNumber = product.length;
    res.send(success(200, totalProductNumber));
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  createProduct,
  fetchProductById,
  updateProduct,
  fetchAllProducts,
  fetchTotalProductNumber,
};
