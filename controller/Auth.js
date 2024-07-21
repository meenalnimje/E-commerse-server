const { success, error } = require("../utilies/responseWrapper");
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send(error(400, "Plz enter Email /Password "));
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send(error(409, "User already exits"));
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashPassword,
    });
    return res.send(success(201, "user created successfully"));
  } catch (e) {
    console.log("this is the error from signup side", e);
    return res.send(error(500, e.message));
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send(error(400, "Plz enter email id/password"));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.send(error(404, "user not registered"));
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.send(error(403, "Incorrect password"));
    }
    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, { accessToken }));
  } catch (e) {
    console.log("this is the error from login side", e);
    return res.send(error(500, e.message));
  }
};
const refreshAccessToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies.jwt) {
    return res.send(error(401, "Refresh token in cookie is required"));
  }
  const refreshToken = cookies.jwt;
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);
    const id = decoded.id;
    const accessToken = generateAccessToken({ id });
    return res.send(success(201, { accessToken }));
  } catch (e) {
    console.log("this error is from refreshAccessToken side", e);
    return res.send(error(500, e.message));
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200, "user logged out"));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};

const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_KEY, {
      expiresIn: "1d",
    });
    return token;
  } catch (e) {
    console.log("this error is from access token generator function", e);
  }
};

const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_KEY, {
      expiresIn: "1y",
    });
    return token;
  } catch (e) {
    console.log(
      "this error is from refresh token generating function side ",
      e
    );
  }
};

module.exports = {
  signup,
  login,
  refreshAccessToken,
  logout,
};
