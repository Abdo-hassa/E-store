const express = require("express");
const productController = require("./product.controller");
const router = express.Router();

const {
  isAuth,
  isAdmin,
} = require("../../middlewares/authorizationMiddlewares");

router.post("/", isAuth, isAdmin, productController.createProduct());
router.post("/search", isAuth, productController.searchProducts());
router.get("/", isAuth, productController.getAllProducts());
router.patch("/:id", isAuth, isAdmin, productController.UpdateProduct());
router.delete("/:id", isAuth, isAdmin, productController.deleteProduct());
router.get("/:id", isAuth, productController.getProduct());

module.exports = router;
