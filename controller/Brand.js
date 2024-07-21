const Brand = require("../model/Brand");
const { success } = require("../utilies/responseWrapper");
const fetchBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.send(success(200, brands));
  } catch (err) {
    res.status(400).json(err);
  }
};

const createBrand = async (req, res) => {
  const brand = new Brand(req.body);
  try {
    const doc = await brand.save();
    res.send(success(201, doc));
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  fetchBrands,
  createBrand,
};
