const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const api = supertest(app);

const User = require("../models/user");

const setupUser = {
  username: "root",
  name: "name test",
  password: "sekret",
};

beforeEach(async () => {
  await User.deleteMany({});

  const setupUserPasswordHash = await bcrypt.hash(setupUser.password, 10);

  const user = new User({
    username: setupUser.username,
    name: setupUser.name,
    passwordHash: setupUserPasswordHash,
  });

  await user.save();
});

test("post with setup user user returns correct setup user", async () => {
  const userToLogin = {
    username: "root",
    password: "sekret",
  };

  const respone = await api
    .post("/api/login")
    .send(userToLogin)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  expect(setupUser.name).toBe(respone.body.name);
  expect(setupUser.username).toContain(respone.body.username);
});

test("non-existing user/wrong pass or username returns invalid pass or username", async () => {
  const userToLoginFailPass = {
    username: "root",
    password: "sekre",
  };

  const userToLoginFailName = {
    username: "roo",
    password: "sekret",
  };

  await api.post("/api/login").send(userToLoginFailPass).expect(401);

  await api.post("/api/login").send(userToLoginFailName).expect(401);
});

afterAll(async () => {
  await mongoose.connection.close();
});
