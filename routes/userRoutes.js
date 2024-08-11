const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.route("/login").get(userController.getLoginPage);
router.route("/login").post(userController.loginUser);
router.route("/register").get(userController.getRegisterPage);
router.route("/register").post(userController.createUser);
router.route("/logout").post(userController.loginUser);


module.exports = router;