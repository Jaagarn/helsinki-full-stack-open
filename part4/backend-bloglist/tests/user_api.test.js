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

describe("when there is initially one user in db", () => {
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

  test("get returns correct setup user", async () => {
    const response = await api.get("/api/users");

    const usernames = response.body.map((r) => r.username);

    expect(response.body).toHaveLength(1);
    expect(usernames).toContain(setupUser.username);
  });

  test("creation succeeds with a fresh username", async () => {
    let users = await User.find({});
    const usersAtStart = users.map((u) => u.toJSON());

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    users = await User.find({});
    const usersAtEnd = users.map((u) => u.toJSON());

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
