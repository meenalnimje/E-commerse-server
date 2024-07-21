const User = require("../model/User");
const { sanitizeUser } = require("../middlewares/isAuth");
const { success, error } = require("../utilies/responseWrapper");

const fetchUserById = async (req, res) => {
  try {
    const id = req.id;
    const user = await User.find({ _id: id });
    res.send(success(200, user));
  } catch (err) {
    res.status(400).json(err);
  }
};
const updateUser = async (req, res) => {
  const id = req.id;
  try {
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.send(success(200, user));
  } catch (err) {
    res.status(400).json(err);
  }
};
module.exports = {
  fetchUserById,
  updateUser,
};
