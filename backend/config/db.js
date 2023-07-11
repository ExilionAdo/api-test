require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅connection established uri: ${conn.connection.host}`);
  } catch (error) {
    console.log(`error connecting to database: ${error} `);
  }
};

module.exports = { connectDB };
