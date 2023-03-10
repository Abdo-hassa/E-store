const app = require("./app.middlewares");
const AppError = require("./utils/appError");
const timeFormat = require("./utils/timeFormat");
const errorHandler = require("./middlewares/errorHandler");

const userRouter = require("./modules/users/user.routes");
const productRouter = require("./modules/products/product.routes");
const orderRouter = require("./modules/orders/order.routes");
const cartRouter = require("./modules/cart/cart.routes");

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/cards", cartRouter);

app.get("/health", (req, res) => {
  const uptime = timeFormat(process.uptime().toString());
  const { ip, url, hostname: host, headers } = req;

  const memory = process.memoryUsage();
  const memoryGB = (memory.heapUsed / 1024 / 1024 / 1024).toFixed(4) + " GB";

  const healthCheck = {
    uptime,
    message: "OK",
    time: new Date(),
    memoryGB,
    ip,
    url,
    host,
    forwardedHost: headers["x-forwarded-host"],
  };

  res.status(200).json(healthCheck);
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(errorHandler);

module.exports = app;
