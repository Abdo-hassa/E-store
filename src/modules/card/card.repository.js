const Card = require("./card.model");

module.exports = {
  async find(query) {
    return await Card.find(query.filter)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .select(query.select)
      .lean(query.lean);
  },

  async findOne(query) {
    return await Card.findOne(query.filter)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .select(query.select)
      .lean(query.lean);
  },
  async aggregate(stages) {
    return await Card.aggregate(stages);
  },

  async bulkWrite(updateOperations) {
    return await Card.bulkWrite(updateOperations);
  },

  async count(filter) {
    return await Card.countDocuments(filter);
  },

  async save(card) {
    const cardSaved = new Card(card);
    await cardSaved.save();
    return cardSaved;
  },

  async saveMany(products) {
    return await Card.insertMany(products);
  },

  async findOneAndUpdate(filter, updatedOrder) {
    return await Card.findOneAndUpdate(filter, updatedOrder, {
      new: true,
    });
  },

  async deleteMany(filter) {
    return await Card.deleteMany(filter);
  },
};
