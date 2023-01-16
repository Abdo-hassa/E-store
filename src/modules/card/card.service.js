const AppError = require("../../utils/appError");
const { promisify } = require("util");
const Product = require("../products/product.model");
const User = require("../users/user.model");

module.exports = {
  async addToCart(req) {
    let err = false;
    let response = {};

    const user = req.user;
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    user.addToCart(product);

    response = {
      status: "success",
      message: "Added to cart",
      statusCode: 200,
    };
    return { err, response };
  },

  async deleteFromCart(req) {
    let err = false;
    let response = {};

    const productId = req.body.productId;
    req.user.removeFromCart(productId);

    response = {
      status: "Deleted",
      statusCode: 200,
    };
    return { err, response };
  },

  async getOne(req) {
    let err = false;
    let response = {};

    const userId = req.user._id.toString();
    const user = await User.findById(userId).populate("cart.items.productid");
    const products = user.cart.items;
    response = {
      status: "success",
      data: products,
      statusCode: 200,
    };
    return { err, response };
  },
};
