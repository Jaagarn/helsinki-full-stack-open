const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const config = require("./utils/config");

mongoose.set("strictQuery", false);

logger.info("Connecting to: ", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    logger.info("Connected to MongoDB!");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB: ", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.static('build'))
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app;
