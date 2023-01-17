const catchAsync = require("../../utils/catchAsync");
const authService = require("./auth.service");

module.exports = {
  signup() {
    return catchAsync(async (req, res, next) => {
      
        const result = await authService.register(req.body);
        if (result.err) return next(result.err);
        res.status(result.response.statusCode).json(result.response);
     
    });
  },

  login() {
    return catchAsync(async (req, res, next) => {
      const { err, response } = await authService.login(req.body, next);

      if (err) return next(err);
      res.status(response.statusCode).json(response);
    });
  },
  
  logout() {
    return (req, res) => {
      res.cookie("token", "loggedout", {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
      });

      res.status(200).json({ status: "success" });
    };
  },


};
