const asyncHandler = require("express-async-handler");
const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { updateHandler } = require("../handlers/updateHandler");
const { hashPassword } = require("../handlers/passwordHandler");
const bcrypt = require("bcrypt");

// @desc Create new user
// @route POST /api/users
// @access public

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all fields required");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(200).json({ user });
});

// @desc Get user
// @route GET /api/users/:id
// @access private

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error(`User with id: ${req.params.id} not found!`);
  }

  res.status(200).json({ user });
});

// @desc Update user
// @route PUT /api/users/:id
// @access private

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error(`User with id: ${req.params.id} not found!`);
  }

  const status = await updateHandler(req.body, user, req.params.id, res);

  if (!status) {
    res.status(400);
    throw new Error({ message: "something went wrong!" });
  }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access private

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error(`User with id: ${req.params.id} not found!`);
  }

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json(`user with id ${req.params.id} deleted`);
});

// @desc login user
// @route POST /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("username and password cannot be empty!");
  }

  const user = await User.findOne({ username });

  if (!user) {
    res.status(400);
    throw new Error(`user with the username ${username} not found!`);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("username or password wrong!");
  } else {
    const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_CLIENT);
    res.status(200).json({ token: accessToken });
  }
});

module.exports = { createUser, getUser, updateUser, deleteUser, loginUser };
