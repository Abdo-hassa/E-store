const Product = require("./product.model");

module.exports = {
  async find(query) {
    return await Product.find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .populate(query.populate)
      .select(query.select)
      .lean(query.lean);
  },

  async findOne(query) {
    return await Product.findOne(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .populate(query.populate)
      .select(query.select)
      .lean(query.lean);
  },
  async aggregate(stages) {
    return await Product.aggregate(stages);
  },


  async count(filter) {
    return await Product.countDocuments(filter);
  },

  async save(product) {
    const productSaved = new Product(product);
    await productSaved.save();
    return productSaved;
  },

  async findOneAndUpdate(filter, updatedProduct) {
    return await Product.findOneAndUpdate(filter, updatedProduct, {
      new: true,
    });
  },

};
