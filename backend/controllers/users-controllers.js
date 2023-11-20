require("dotenv").config();
const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");
const asyncHandler = require("../middlewares/asyncHandler");

const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(401).json({ message: "User doesn't exist" });
  } else {
    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Credentials aren't correct" });
    } else {
      generateToken(res, user._id);
      // console.log(res.cookie.jwt);
      return res.status(200).json(user);
    }
  }
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exits");
  }
  const user = await User.create({ name, email, password });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  // res.clearCookie("jwt");
  res.status(200).json({
    message: "Logged out successfully",
  });
});

const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(201).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});
  if (!users) {
    res.status(404);
    throw new Error("No users found");
  }
  res.status(200).json(users);
});

const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.uid).select("-password -__v");
  if (!user) {
    res.status(404);
    throw new Error("No user found");
  }
  res.status(200).json(user);
});

const updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.uid);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } else {
    res.status(404);
    throw new Error("No users found");
  }
});

const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.uid);
  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Can't delete an admin!");
    }
    await User.deleteOne({ _id: user._id });
    res.status(204).json({
      message: "deleted",
    });
  } else {
    res.status(404);
    throw new Error("No users found");
  }
});

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
