const express = require("express");

const authController = require("../controllers/auth_controller.js");

const authRouter = express.Router();

authRouter.post("/sendOTP", authController.sendOtpController);
authRouter.post("/verifyOTP", authController.verifyOTPController);
authRouter.post("/createNewUser", authController.createNewUserController);
authRouter.post("/login", authController.loginUserController);
authRouter.post("/check", authController.checkIfUserExsists);

module.exports = authRouter;