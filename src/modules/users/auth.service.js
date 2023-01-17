const repository = require("./user.repository");
const AppError = require("../../utils/appError");
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

};
