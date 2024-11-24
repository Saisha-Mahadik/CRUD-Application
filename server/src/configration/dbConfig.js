const mongoose = require("mongoose");

const connectedToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
  }
};

module.exports = { mongoose, connectedToMongoDB };
