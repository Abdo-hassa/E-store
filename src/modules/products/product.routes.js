const express = require("express");
const productController = require("./product.controller");
const router = express.Router();

const { isAuth, isAdmin } = require('../../middlewares/authorizationMiddlewares');


router.post("/", productController.createProduct());
router.post("/search", productController.searchProducts());
router.get("/", productController.getAllProducts());
router.patch("/:id", productController.UpdateProduct());
router.delete("/:id", productController.deleteProduct());
router.get("/:id", productController.getProduct());

module.exports = router;
