const app = require("./src/app.routes");
const config = require("./src/config/config");
const mongoose = require("mongoose");
const databaseURL = config.dbURI;
const port = config.port;


mongoose
  .connect(databaseURL, {
    useNewUrlParser: true,
  })
  .then(async () => {
    console.log("Connected to DB");
  });

const server = app.listen(port, async () => {
  console.log("Current Date: ", new Date().toLocaleString());
  console.log("server running on:", port);
  console.log(new Date().toLocaleString());
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
});

module.exports = {
  server,
};
