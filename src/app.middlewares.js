const express = require("express");
const cors = require("cors");
const { protect } = require("./middlewares/protection");
const config = require("./config/config");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const AppError = require("./utils/appError");
const app = express();
const helmet = require("helmet");
app.use(helmet());

const limiter = rateLimit({
  windowMs: 60, // 1 second
  max: 12, // limit each IP to 12 requests per second
});

app.use(limiter);


  app.use(
    cors({
      origin: "*",
    }),
    express.json(),
  );


app.use(compression());



module.exports = app;
