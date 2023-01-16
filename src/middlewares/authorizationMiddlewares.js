const User = require("../modules/users/user.model");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");
const config = require("../config/config");

const jwt = require("jsonwebtoken");

exports.isAuth = catchAsync(async (req, res, next) => {
  if (
    !req.headers?.authorization &&
    !req.headers?.authorization?.startsWith("Bearer")
  ) {
    throw new AppError("Not authenticated", 401);
  } else {
    const token = req.headers.authorization.split(" ")[1];
    let decodedToken = await promisify(jwt.verify)(token, config.jwtSecret);

    let user = await User.findById(decodedToken.id);
    req.user = user;
    if (!req.user) {
      throw new AppError("Invalid token.", 401);
    }
    next();
  }
});

exports.isAdmin = catchAsync(async (req, res, next) => {
  if (req.user.isAdmin) {
    next();
  } else {
    throw new AppError("Admins only allowed to do that", 403);
  }
});
