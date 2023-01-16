const Order = require("./order.model");

module.exports = {
  async find(query) {
    return await Order.find(query.filter)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .select(query.select)
      .lean(query.lean);
  },

  async findOne(query) {
    return await Order.findOne(query.filter)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .select(query.select)
      .lean(query.lean);
  },
  async aggregate(stages) {
    return await Order.aggregate(stages);
  },

  async bulkWrite(updateOperations) {
    return await Order.bulkWrite(updateOperations);
  },

  async count(filter) {
    return await Order.countDocuments(filter);
  },

  async save(order) {
    const orderSaved = new Order(order);
    await orderSaved.save();
    return orderSaved;
  },

  async saveMany(orders) {
    return await Order.insertMany(orders);
  },

  async findOneAndUpdate(filter, updatedOrder) {
    return await Order.findOneAndUpdate(filter, updatedOrder, {
      new: true,
    });
  },

  async deleteMany(filter) {
    return await Order.deleteMany(filter);
  },
};
