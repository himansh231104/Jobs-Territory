const mongoose = require('mongoose');

const connectDB = async () => {
    try {
      // Connect to MongoDB
      await mongoose.connect(process.env.MONGO_URI);
      console.log('MongoDB Connected');
    } catch (err) {
      // Handle errors if connection fails
      console.error(err.message);
      process.exit(1); // Exit process with failure
    }
  };

module.exports = connectDB;
