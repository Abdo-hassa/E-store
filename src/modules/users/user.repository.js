const User = require('./user.model');

module.exports = {
  async find(query) {
    return await User.find(query.filter)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .select(query.select)
      .lean(query.lean);
  },

  async findOne(query) {
    return await User.findOne(query.filter)
      .sort(query.sort)
      .limit(query.limit)
      .skip(query.skip)
      .populate(query.populate)
      .select(query.select)
      .lean(query.lean);
  },

  async bulkWrite(updateOperations) {
    return await User.bulkWrite(updateOperations);
  },

  async count(filter) {
    return await User.countDocuments(filter);
  },

  async save(user) {
    const userSaved = new User(user);
    await userSaved.save();
    return userSaved;
  },

  async saveMany(users) {
    return await User.insertMany(users);
  },

  async findOneAndUpdate(filter, updatedUser) {
    return await User.findOneAndUpdate(filter, updatedUser, {
      new: true,
    });
  },

  async deleteMany(filter) {
    return await User.deleteMany(filter);
  },
	
};
