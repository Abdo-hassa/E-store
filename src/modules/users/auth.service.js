const repository = require("./user.repository");
const AppError = require("../../utils/appError");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const utils = require("./user.utils");
const { validation } = require("./user.validation");

module.exports = {
  async register(user) {
    let err = false;
    let response = {};

    const { valid, errors } = await validation(user);
    if (!valid) {
      err = new AppError("validation failed", 400, errors);
      return { err, response };
    }

    const newUser = await repository.save(user);
    const token = utils.signToken(newUser.id);

    if (!token || !newUser) {
      err = new AppError("Error in sign up. Try again later.", 500);
      return { err, response };
    }

    response = {
      token,
      data: newUser.email,
      status: "success",
      statusCode: 200,
    };
    return { err, response };
  },

  async login(user) {
    let err = false;
    let response = {};

    let email = user.email;
    let password = user.password;
    // 1- check if email and password exist
    if (!email || !password) {
      err = new AppError("Please provide email and password.", 400);
      return { err, response };
    }

    // 2- check if user exists && password is correct
    user = await repository.findOne({
      filter: { email },
      select: "password",
    });

    if (!user || !(await user.isPasswordCorrect(password, user.password))) {
      err = new AppError("Incorrect email or password.", 401);
      return { err, response };
    }

    // 3- If everything is OK, send token to client
    const token = utils.signToken(user.id);
    if (!token) {
      err = new AppError("Error in login. Please log in again.", 500);
      return { err, response };
    }
    response = {
      token,
      status: "success",
      statusCode: 200,
    };
    return { err, response };
  },

  async protect(headers) {
    let err = false;
    let response = {};

    let token;

    if (headers.authorization && headers.authorization.startsWith("Bearer")) {
      token = headers.authorization.split(" ")[1];
    }
    // 1- check if token is provided
    if (!token) {
      err = new AppError(
        "You are not logged in. Please log in to get access.",
        401
      );
      return { err, response };
    }

    // 2- Verfication token if not valid it will fire an error
    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token, config.jwtSecret);
    } catch (err) {
      const appErr = new AppError("Invalid token, Please log in again.", 401);
      return { err: appErr, response };
    }

    // 3- Check if user still exists
    const currentUser = await repository.findOne({
      filter: { _id: decoded.id },
    });

    if (!currentUser) {
      err = new AppError(
        "The user belonging to this token does no longer exist.",
        401
      );
      return { err, response };
    }

    // 4- Check if user changed password after the token was issued
    if (currentUser.isPasswordChangedAfter(decoded.iat)) {
      err = new AppError(
        "User recently changed password! Please log in again.",
        401
      );
      return { err, response };
    }

    // 3- If everything is OK, retrun current use
    response = {
      data: currentUser,
      status: "success",
      statusCode: 200,
    };
    return { err, response };
  },

};
