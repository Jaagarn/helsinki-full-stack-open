const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const middleware = require("../utils/middleware");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    middleware.errorHandler({
      name: "ValidationError",
      message: "Password is too short (must be more than 3 chars)",
    }, request, response);
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    middleware.errorHandler(error, request, response);
  }
});

usersRouter.put("/:id", async (request, response, next) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      request.params.id,
      { username, name, passwordHash },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );
    response.json(updatedUser);
  } catch (error) {
    middleware.errorHandler(error, request, response);
  }
});

usersRouter.delete("/:id", async (request, response, next) => {
  try {
    await User.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    middleware.errorHandler(error, request, response);
  }
});

module.exports = usersRouter;
