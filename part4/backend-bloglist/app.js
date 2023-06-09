const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const config = require("./utils/config");

const setUpExpressApp = () => {
  app.use(cors());
  app.use(express.json());
  app.use(express.static("build"));
  app.use(middleware.requestLogger);
  app.use(middleware.tokenExtractor);

  app.use("/api/users", usersRouter);
  app.use("/api/login", loginRouter);
  app.use("/api/blogs", middleware.userExtractor, blogsRouter);

  app.use(middleware.unknownEndpoint);
  app.use(middleware.errorHandler);
};

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected to MongoDB!");
  } catch (error) {
    logger.error("Error connecting to MongoDB: ", error.message);
  }

  setUpExpressApp();
};

mongoose.set("strictQuery", false);

logger.info("Connecting to: ", config.MONGODB_URI);

connectToMongoDB();

module.exports = app;
