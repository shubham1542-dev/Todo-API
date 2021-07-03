// First step : Token fetch from header
// second step : check if token exixts
// validate token(expire or not) based on the isexpire value variable
// Fourth => if verify proceed next else throw err;

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  //step1
  const token = req.header("x-api-key");
  //step2
  if (!token) {
    return res.json({
      statusCode: 404,
      msg: "Token Not Found, Authorization Denied !",
    });
  }
  //stp3

  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.json({ statusCode: 401, msg: "Token is Not valid" });
  }
};