const express = require("express");
const { isAuth } = require("../../middlewares/authorizationMiddlewares");
const orderController = require("./order.controller");
const router = express.Router();

router.post("/", isAuth, orderController.createOrder());
router.get("/income", isAuth, orderController.getIncome());
router.get("/", isAuth, orderController.getAllOrders());
router.patch("/:id", isAuth, orderController.UpdateOrder());
router.delete("/:id", isAuth, orderController.deleteOrder());
router.get("/:userId", isAuth, orderController.getOrder());

module.exports = router;
