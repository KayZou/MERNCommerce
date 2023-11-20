require("dotenv").config();
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middlewares/asyncHandler");
const User = require("../models/users.model");

//protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  //read jwt from cookie:
  token = req.cookies.jwt;
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decoded);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    console.log(error.message);
    res.status(404);
    throw new Error("Couldn't verify the token");
  }
});

//admin middleware:
const admin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not an Admin");
  }
};

module.exports = { admin, protect };
