const Cart = require("../model/Cart");
const { success } = require("../utilies/responseWrapper");

const fetchCartByUser = async (req, res) => {
  try {
    const id = req.id;
    const cartItems = await Cart.find({ user: id })
      .populate("user")
      .populate("product");
    res.send(success(200, cartItems));
  } catch (err) {
    res.status(400).json(err);
  }
};

const addToCart = async (req, res) => {
  const id = req.id;
  const cart = new Cart({ ...req.body, user: id });
  try {
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.send(success(201, result));
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteFromCart = async (req, res) => {
  const { id } = req.params;
  try {
    const doc = await Cart.findByIdAndDelete(id);
    res.send(success(200, doc));
  } catch (err) {
    res.status(400).json(err);
  }
};
const updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("product");
    res.send(success(200, cart));
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  fetchCartByUser,
  addToCart,
  deleteFromCart,
  updateCart,
};
