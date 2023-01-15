const Product = require("../products/product.model");
const productService = require("../products/product.service");
const cloudinary = require("cloudinary");
const catchAsync = require("../../utils/catchAsync");

module.exports = {

  createProduct() {
    return catchAsync(async (req, res, next) => {
      const result = await productService.create(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },


  UpdateProduct() {
    return catchAsync(async (req, res, next) => {
      const result = await productService.update(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },

  deleteProduct() {
    return catchAsync(async (req, res, next) => {
      const result = await productService.delete(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },

  getProduct() {
    return catchAsync(async (req, res, next) => {
      const result = await productService.getOne(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },

  getAllProducts() {
    return catchAsync(async (req, res, next) => {
      const result = await productService.getAll(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },

  searchProducts() {
    return catchAsync(async (req, res, next) => {
      const result = await productService.search(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },
};

