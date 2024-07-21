const Order = require("../model/Order");
const { success } = require("../utilies/responseWrapper");
exports.fetchOrdersByUser = async (req, res) => {
  const id = req.id;
  try {
    const orders = await Order.find({ user: id });
    res.send(success(200, orders));
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createOrder = async (req, res) => {
  // here we have to update stocks;

  try {
    const order = new Order(req.body);
    const doc = await order.save();
    res.send(success(201, doc));
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    res.send(success(200, order));
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send(success(200, order));
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllOrders = async (req, res) => {
  // this is for admin

  try {
    let order = Order.find({ deleted: { $ne: true } });
    console.log("resq query of fetcAllproducts", req.query);
    if (req.query._sort && req.query._order) {
      order = order.sort({ [req.query._sort]: req.query._order });
    }

    if (req.query._page && req.query._limit) {
      const pageSize = req.query._limit;
      const page = req.query._page;
      order = order.skip(pageSize * (page - 1)).limit(pageSize);
    }
    const docs = await order.exec();
    res.send(success(200, docs));
  } catch (err) {
    res.status(400).json(err);
  }
};

// fetchTotalOrderNumber

exports.fetchTotalOrderNumber = async (req, res) => {
  // this is for admin

  try {
    let order = await Order.find();
    const totalOrderNumber = order.length;
    res.send(success(200, totalOrderNumber));
  } catch (err) {
    res.status(400).json(err);
  }
};
