const bcrypt = require("bcrypt");

const hashPassword = async (pass) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePasswords = async () => {};

module.exports = { hashPassword };
