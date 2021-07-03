const Task = require("../models/Task");
//Desc Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    // Find method of Mongoose Model return an array or an array of obejct
    //Task a = userId(1234)
    //Task b = userId(5678)
    // user a 1234
    // This will retuen the task A to user A
    const task = await Task.find({ userID: req.user.id });
    res.json(task);
  } catch (error) {
    console.log(error.message);
  }
};

//create Task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    var taskObj = {
      userID: req.user.id,
      title: title,
      description: description,
    };

    var task = await new Task(taskObj);
    await task.save();

    res.json({
      statusCode: 200,
      mag: "Task Created ",
      data: task,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//@Put Route
// @DESC : Edit Details

exports.updateTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    var NewObj = {
      title: title,
      description: description,
    };
    var task = await Task.findById(req.params.id);
    if (task) {
      var task = await Task.findOneAndUpdate(
        { _id: req.params.id },
        { $set: NewObj },
        { new: true }
      );

      return res.json({
        statusCode: 200,
        msg: "Task Updated ",
        data: task,
      });
    }
    return res.json({
      statusCode: 401,
      msg: "Enter a Valid ID",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// Delete Route
//@Desc : Delete the route by id

exports.deleteTask = async (req, res) => {
  try {
    var task = await Task.findById(req.params.id);
    if (task) {
      await Task.findOneAndDelete({ _id: req.params.id });
      return res.json({
        statusCode: 200,
        msg: "Task Deleted !",
      });
    }
    return res.json({
      statusCode: 401,
      msg: "Enter a Valid ID",
    });
  } catch (error) {
    console.log(error.message);
  }
};
