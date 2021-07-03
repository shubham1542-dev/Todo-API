// Import packages
const express = require("express");
const app = express();
const connectDB = require("./config/db");

connectDB();
app.use(require("cors")());

// start config and routes etc

// for post request : we can handel million of request with this
// insted of using body parser we can use the express.json({extended: true})

app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use("/api/user", require("./routes/user"));
app.use("/api/task", require("./routes/task"));

//if we pass the wrong route

app.get("*", (req, res) => {
  res.json({ statusCode: 404, message: "Route Not found" });
});

//Assignmt = > Put Route // Update Task by Id => Mongoose Model
//Task.findOneAndUpdate(id:req.params.id),{set : taskobj},{new : true}
// Delete by id findbyidanddelete

// TODO => Basic crud and basic Auth = > front end simple react
// BooksStore => Basic CRUD , File Hashing and two
// res.send=>{object stringified data} = > result will be in string object forms => react and redux
// base routes and in it we add other path according to the need
// Redux statemamangement
// API Get route => arrofobj[1000],
// Redux Get Route = > arrofobj[1500],

app.listen(PORT, () => {
  console.log("Server connected on PORT:", PORT);
});
