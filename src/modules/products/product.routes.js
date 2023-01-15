const express = require("express");
const productController = require("./product.controller");
const router = express.Router();

router.post("/", productController.createProduct());
router.post("/search", productController.searchProducts());
router.get("/", productController.getAllProducts());
router.put("/:id", productController.UpdateProduct());
router.delete("/:id", productController.deleteProduct());
router.get("/:id", productController.getProduct());

module.exports = router;
