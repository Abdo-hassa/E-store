const cardService = require("../card/card.service");
const catchAsync = require("../../utils/catchAsync");

module.exports = {
  addCard() {
    return catchAsync(async (req, res, next) => {
      const result = await cardService.addToCart(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },

  deleteFromCard() {
    return catchAsync(async (req, res, next) => {
      const result = await cardService.deleteFromCart(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },

  getCard() {
    return catchAsync(async (req, res, next) => {
      const result = await cardService.getOne(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },
};
