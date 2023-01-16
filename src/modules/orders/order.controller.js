const orderService = require("../orders/order.service");
const catchAsync = require("../../utils/catchAsync");

module.exports = {
  createOrder() {
    return catchAsync(async (req, res, next) => {
      const result = await orderService.create(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },

  UpdateOrder() {
    return catchAsync(async (req, res, next) => {
      const result = await orderService.update(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },

  deleteOrder() {
    return catchAsync(async (req, res, next) => {
      const result = await orderService.delete(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },

  getOrder() {
    return catchAsync(async (req, res, next) => {
      const result = await orderService.getOne(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },

  getAllOrders() {
    return catchAsync(async (req, res, next) => {
      const result = await orderService.getAll(req);
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },

  getIncome() {
    return catchAsync(async (req, res, next) => {
      const result = await orderService.income();
      if (result.err) return next(result.err);
      res.status(result.response.statusCode).json(result.response);
    });
  },
};
