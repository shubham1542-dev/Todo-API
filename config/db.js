const mongoose = require("mongoose");
// IMPORT THE DOTENV MODULE WITH ENV FILE
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      //for warining : optional
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Database connected !");
  } catch (error) {
    console.log(error.message);
    process.exit(1); // This statement will terminate the server
  }
};

module.exports = connectDB;
