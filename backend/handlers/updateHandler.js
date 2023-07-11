const User = require("../models/UserModel");

const updateHandler = async (data, user, id, res) => {
  const { username, email, password } = data;

  try {
    if (username) {
      await User.findByIdAndUpdate(id, {
        username,
      });

      res.status(200).json({ message: "username changed" });
      return true;
    }

    if (email) {
      await User.findByIdAndUpdate(id, {
        email,
      });
      res.status(200).json({ message: "email changed" });
      return true;
    }

    return false;
  } catch (error) {
    console.log("something went wrong", error);
  }
};

module.exports = { updateHandler };
