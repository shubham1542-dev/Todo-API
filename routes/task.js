const taskController = require("../controller/taskController");
const router = require("express").Router();
const auth = require("../middleware/auth");

// Get Route
//get all routes of logged in user

router.get("/all", auth, taskController.getAllTasks);

//@Post Route
//@Desc Craete Task

router.post("/create-task", auth, taskController.createTask);

router.put("/update-task/:id", auth, taskController.updateTask);

router.delete("/delete-task/:id", auth, taskController.deleteTask);

module.exports = router;
