require("dotenv").config();
const express = require("express");
const app = express();

const { errorHandler } = require("./backend/middleware/errorHandler");
const { connectDB } = require("./backend/config/db");

const PORT = process.env.PORT || 6001;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", require("./backend/routes/users"));

app.get("/", (req, res) => {
  console.log("ONLINE");
});

app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`server running on port: ${PORT}`);
});
