// now we will work with headers part of req
const User = require("../model/User");
const { error, success } = require("../utilies/responseWrapper");
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.send(error(401, "Authorization header is required"));
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, "abjcsjijwjdjwio");
    req._id = decoded.user.id;
    // req.user=user isse pura ka pura user aa jata
    const user = await User.findById(decoded.user.id);
    if (!user) {
      return res.send(error(404, "user not found"));
    }
    next();
  } catch (e) {
    console.log("this error is from requireUser side", e);
    return res.send(error(401, "Invalid access key"));
  }
};
