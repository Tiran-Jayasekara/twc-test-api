require("dotenv").config();

const mongoose = require("mongoose");

const database = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
    return connection;

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = database;