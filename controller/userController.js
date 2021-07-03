// @Post Route
// @DESC user signup / user create  (Post)
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config;

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user Already Exist
    var user = await User.findOne({ email });
    if (user) {
      return res.json({ statusCode: 400, msg: "User Already Exists!" });
    }

    // add values to model : create the new user using new keyword
    user = new User({ name, email, password });
    // shubham1213 => bcyptjs

    // passward Hashing
    // step 1 : of pw hashing => salt generation

    // max => good encryption

    // or we can directlt enter 10 in the user.password
    const salt = await bcrypt.genSalt(10);

    // step 2 of pw hashing => modifying the DB password
    user.password = await bcrypt.hash(password, salt); // salt = 10

    // save in database
    await user.save();
    // about working of jwt

    // Token Generation
    // JWT Token  // json web token => secret Toekn  (collection of strings = 150 approx chaearcter Randomm)

    //primay key => Id
    //tOKEN => id HIDEN
    // TOKEN => USER A => USER b CAN NOT ACCESS
    // eXIPTY : LIKE SESSION
    //Token => Vedant => hdbhcdsjcncec
    // Get my task => Token => user specific Tasks fetch kr skte ha
    //middleware => auth.js => token decode krenge => user ID => specifictask sirf apna fetch kr skte ha

    // Token Gneration we
    // jo jwtsecret key genertate krege bohi decode kergae
    // STEP1 : CREATION OF PAYLOAD
    const payload = {
      user: {
        id: user.id,
      },
    };

    //step 2 token genertaion

    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 360000000,
      },
      (err, token) => {
        if (err) throw err;
        //send resonse to client
        return res.json({
          statusCode: 200,
          msg: "User Registered !",
          user: user,
          token: token,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

// @Post Route
// @DESC For Login Purpose :

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    var user = await User.findOne({ email });
    if (!user) {
      return res.json({
        statusCode: 400,
        msg: "User Does Not Exists ! ",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        statusCode: 401,
        msg: "Invalid Credentials!",
      });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.jwtSecret,
      {
        expiresIn: 360000000,
      },
      (err, token) => {
        if (err) throw err;
        return res.json({
          statusCode: 200,
          msg: "User signed in successfully",
          token: token,
          user: user,
        });
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};
