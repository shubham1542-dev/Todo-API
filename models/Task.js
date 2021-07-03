const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    //required : true
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = Task = mongoose.model("Task", TaskSchema);

//TODO => TASK => title , description, date , user = ???? (Mongodb object id objectID) token
