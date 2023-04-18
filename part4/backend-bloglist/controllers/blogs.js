const blogsRouter = require("express").Router();

const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
  
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  try {
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, author, url, likes },
      {
        new: true,
        runValidators: true,
        context: "query",
      }
    );
    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  const user = request.user;

  const blogToDelete = await Blog.findById(request.params.id);

  if (!(blogToDelete.user.toString() === user.id.toString())) {
    return response.status(401).json({ error: "user mismatch" });
  }

  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
