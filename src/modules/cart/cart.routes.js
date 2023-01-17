const express = require("express");
const {
  isAuth,
  isAdmin,
} = require("../../middlewares/authorizationMiddlewares");
const cartController = require("./cart.controller");
const router = express.Router();

router.post("/:productId", isAuth, cartController.addCart());
router.delete("/", isAuth, cartController.deleteFromCart());
router.get("/", isAuth, cartController.getCart());

module.exports = router;
