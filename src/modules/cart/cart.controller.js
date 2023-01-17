const cartService = require("./cart.service");
const catchAsync = require("../../utils/catchAsync");

module.exports = {
  addCart() {
    return catchAsync(async (req, res, next) => {
      const result = await cartService.addToCart(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },

  deleteFromCart() {
    return catchAsync(async (req, res, next) => {
      const result = await cartService.deleteFromCart(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },

  getCart() {
    return catchAsync(async (req, res, next) => {
      const result = await cartService.getOne(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },
};
