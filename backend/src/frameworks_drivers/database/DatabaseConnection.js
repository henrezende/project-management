const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    throw err;
  }
};

module.exports = dbConnection;
