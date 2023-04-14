const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

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

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  response.body.forEach((r) => {
    expect(r.id).toBeDefined();
  });
});

//More like a specific value is precent in a blog object
test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const urls = response.body.map((r) => r.url);
  expect(urls).toContain("www.blog2testsite.xyz");
});

test("a valid blog can be added", async () => {
  const newBlog = {
    title: "Blog 3 test title",
    author: "Blog 3 test author",
    url: "www.blog3testsite.xyz",
    likes: 3,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");

  const authors = response.body.map((r) => r.author);

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(authors).toContain("Blog 3 test author");
});

afterAll(async () => {
  await mongoose.connection.close();
});
