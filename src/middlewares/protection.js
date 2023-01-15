const config = require('../config/config');
const AppError = require('../utils/appError');

const protect = (req, res, next) => {
  const query = req.query;
  const ourToken = config.token;

  if (query.token !== ourToken) {
    return next(new AppError('Authentication error', 401, 'Token not valid'));
  }
  next();
};


module.exports = { protect };
