const express = require("express");
const { isAuth } = require("../../middlewares/authorizationMiddlewares");
const authController = require("./auth.controller");
const router = express.Router();

router.post("/signup", authController.signup());
router.post("/login", authController.login());

router.get("/logout", isAuth, authController.logout());

module.exports = router;
