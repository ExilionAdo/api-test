require("dotenv").config();
const jwt = require("jsonwebtoken");

const tokenAuthenticate = (req, res, next) => {
  console.log(req.user);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    res.status(401);
    throw new Error("No token");
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(decodedToken);

  if (err) {
    res.status(403);
    throw new Error("Forbidden page");
  }

  next();
};

module.exports = { tokenAuthenticate };
