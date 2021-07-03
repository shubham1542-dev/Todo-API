const userController = require("../controller/userController");
const router = require("express").Router();

// @Post Route
//@DESC Sign UP

router.post("/register", userController.signup);
router.post("/login", userController.login);

module.exports = router;
