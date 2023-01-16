const express = require("express");
const {
  isAuth,
  isAdmin,
} = require("../../middlewares/authorizationMiddlewares");
const cardController = require("./card.controller");
const router = express.Router();

router.post("/:productId", isAuth, cardController.addCard());
router.delete("/", isAuth, cardController.deleteFromCard());
router.get("/", isAuth, cardController.getCard());

module.exports = router;
