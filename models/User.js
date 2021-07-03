const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    // required : true,
  },
  email: {
    type: String,
    // required : true,
  },
  password: {
    type: String,
    // required : true,
  },
});

module.exports = User = mongoose.model("User", UserSchema);

// Module.exports =  model => for use in anothe module with in the system
// mongoose.model("User",UserSchema);  is for the database where User name model is created and field are provided by the UserSchema
