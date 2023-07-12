const express = require("express");
const router = express.Router();
const { tokenAuthenticate } = require("../middleware/jwtHandler");

const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
} = require("../controllers/userController");

router.post("/", createUser);

router.post("/login", loginUser);

router.use(tokenAuthenticate);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
