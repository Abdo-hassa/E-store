const repository = require("./order.repository");
const AppError = require("../../utils/appError");
const config = require("../../config/config");
const Order = require("../orders/order.model");
const User = require("../users/user.model");

module.exports = {
  async create(req) {
    let err = false;
    let response = {};
    const userid = req.user._id.toString();
    const user = await User.findById(userid).populate("cart.items.productid");
    const products = user.cart.items.map((i) => {
      return {
        quantity: i.quantity,
        product: { ...i.productid._doc },
      };
    });
    if (products.length === 0) {
      err = new AppError("there is no products in your card", 401);
      return { err, response };
    }
    let TotalPrice = 0;
    for (var p of products) {
      TotalPrice = TotalPrice + p.product.price * p.quantity;
    }
    let orderData = {
      userId: req.user,
      products: products,
      TotalPrice: TotalPrice,
      address: req.body.address,
    };
    const order = await repository.save(orderData);
    req.user.clearCart();

    response = {
      status: "success",
      message: "Ordered",
      statusCode: 200,
    };
    return { err, response };
  },

  async update(req) {
    let err = false;
    let response = {};

    const orderId = req.params.id;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { $set: req.body },
      { new: true }
    );

    if (!order) {
      err = new AppError("there is no Order", 401);
      return { err, response };
    }

    await order.save();

    response = {
      data: order,
      status: "updated",
      statusCode: 200,
    };
    return { err, response };
  },

  async delete(req) {
    let err = false;
    let response = {};

    const orderId = req.params.id;
    await Order.findByIdAndDelete(orderId);

    response = {
      status: "success",
      message: `Product : ${orderId} Deleted`,
      statusCode: 200,
    };
    return { err, response };
  },

  async getOne(req) {
    let err = false;
    let response = {};

    const userId = req.params.userId;
    const order = await Order.findOne({ userId: userId }).populate("userId");
    if (!order) {
      err = new AppError("No order found", 404);
      return { err, response };
    }
    response = {
      status: "success",
      data: order,
      statusCode: 200,
    };
    return { err, response };
  },

  async getAll(req) {
    let err = false;
    let response = {};

    let skip = req.query.skip || config.skip;
    let limit = req.query.limit || config.limit;

    let matchQuery = {};
    let pipeline = [];

    let orders;

    pipeline = [
      { $match: matchQuery },
      {
        $lookup: {
          from: `users`,
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: true },
      },
      { $skip: Number(skip) },
      { $limit: Number(limit) },
    ];

    orders = await repository.aggregate(pipeline);

    response = {
      status: "success",
      data: orders,
      statusCode: 200,
    };
    return { err, response };
  },

  async income() {
    let err = false;
    let response = {};

    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    const income = await repository.aggregate([
      { $match: { createdAt: { $lte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$TotalPrice",
        },
      },
      {
        $group: {
          _id: "$month",
          total_Income: { $sum: "$sales" },
        },
      },
    ]);
    response = {
      status: "success",
      data: income,
      statusCode: 200,
    };
    return { err, response };
  },
};
