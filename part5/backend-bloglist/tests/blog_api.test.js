const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");

const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Blog 1 test title",
    author: "Blog 1 test author",
    url: "www.blog1testsite.xyz",
    likes: 1,
  },
  {
    title: "Blog 2 test title",
    author: "Blog 2 test author",
    url: "www.blog2testsite.xyz",
    likes: 2,
  },
];

const setupUser = {
  username: "root",
  name: "name test",
  password: "sekret",
};

let authToken = "ThisIsATerribleSolution";

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const setupUserPasswordHash = await bcrypt.hash(setupUser.password, 10);

  const user = new User({
    username: setupUser.username,
    name: setupUser.name,
    passwordHash: setupUserPasswordHash,
  });

  await user.save();
  const loginRespone = await api
    .post("/api/login")
    .send({ username: setupUser.username, password: setupUser.password });

  authToken = loginRespone.body.token;

  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${authToken}`)
    .send(initialBlogs[0]);
  await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${authToken}`)
    .send(initialBlogs[1]);
});

describe("get tests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("unique identifier property of the blog posts is named id", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`);
    response.body.forEach((r) => {
      expect(r.id).toBeDefined();
    });
  });

  //More like a specific value is precent in a blog object
  test("a specific blog is within the returned blogs", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`);

    const urls = response.body.map((r) => r.url);
    expect(urls).toContain("www.blog2testsite.xyz");
  });
});

describe("post tests", () => {
  test("a valid blog can be added", async () => {
    const newBlog = {
      title: "Blog 3 test title",
      author: "Blog 3 test author",
      url: "www.blog3testsite.xyz",
      likes: 3,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`);

    const authors = response.body.map((r) => r.author);

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(authors).toContain("Blog 3 test author");
  });

  test("a blog without likes can be added and defaults to 0 ", async () => {
    const newBlog = {
      title: "Blog 4 test title",
      author: "Blog 4 test author",
      url: "www.blog4testsite.xyz",
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`);

    const responseBlog = response.body.find(
      (r) => r.title === "Blog 4 test title"
    );

    expect(response.body).toHaveLength(initialBlogs.length + 1);
    expect(responseBlog.likes).toBe(0);
  });

  test("a blog without title can't be added and returns code 400", async () => {
    const newBlog = {
      author: "Blog 4 test author",
      url: "www.blog4testsite.xyz",
      likes: 5,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`)
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test("a blog without url can't be added and returns code 400", async () => {
    const newBlog = {
      title: "Blog 6 test title",
      author: "Blog 6 test author",
      likes: 6,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`)
      .send(newBlog)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.body).toHaveLength(initialBlogs.length);
  });
});

describe("put tests", () => {
  test("an existing blog can be updated", async () => {
    const getResponeSetup = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`);

    const existingBlog = getResponeSetup.body.find(
      (r) => r.title === "Blog 1 test title"
    );

    const updatedBlog = {
      title: "Blog 1 test title",
      author: "Blog 1 test author",
      url: "www.blog1testsite.xyz",
      likes: 7,
    };

    const putResponse = await api
      .put(`/api/blogs/${existingBlog.id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send(updatedBlog)
      .expect("Content-Type", /application\/json/);

    expect(putResponse.body.id).toBe(existingBlog.id);
    expect(putResponse.body.title).toBe(existingBlog.title);
    expect(putResponse.body.likes).toBe(updatedBlog.likes);
  });
});

describe("delete tests", () => {
  test("an existing blog can be deleted", async () => {
    const getResponeSetup = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`);

    const existingBlog = getResponeSetup.body.find(
      (r) => r.title === "Blog 1 test title"
    );

    await api
      .delete(`/api/blogs/${existingBlog.id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .expect(204);

    const getResponeVerification = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${authToken}`);

    const ids = getResponeVerification.body.map((r) => r.id);

    expect(ids).not.toContain(existingBlog.id);
    expect(getResponeVerification.body).toHaveLength(initialBlogs.length - 1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
