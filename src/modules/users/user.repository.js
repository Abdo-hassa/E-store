const User = require('./user.model');

module.exports = {
  async find(query) {
    return await User.find(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .populate(query.populate)
      .select(query.select)
      .lean(query.lean);
  },

  async findOne(query) {
    return await User.findOne(query.filter)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit)
      .populate(query.populate)
      .select(query.select)
      .lean(query.lean);
  },

  

  async count(filter) {
    return await User.countDocuments(filter);
  },

  async save(user) {
    const userSaved = new User(user);
    await userSaved.save();
    return userSaved;
  },

  async findOneAndUpdate(filter, updatedUser) {
    return await User.findOneAndUpdate(filter, updatedUser, {
      new: true,
    });
  },
};
