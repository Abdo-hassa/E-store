const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../E-store.json");
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
  express.json()
);

app.use(compression());
app.get("/api/v1/docs", swaggerUi.setup(swaggerDocument));

app.use("/api/v1/", swaggerUi.serve);

module.exports = app;
