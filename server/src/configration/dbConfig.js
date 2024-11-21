const mongoose = require("mongoose");

const connectedToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/crud_db");

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
};

module.exports = { mongoose, connectedToMongoDB };
