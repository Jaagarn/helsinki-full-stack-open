const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.TEST_MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

if (process.argv.length > 2) {
  const title = process.argv[2];
  const author = process.argv[3];
  const url = process.argv[4];
  const likes = Number(process.argv[5]);

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  });

  blog.save().then((result) => {
    console.log("Blog saved!");
    mongoose.connection.close();
  });
} else {
  console.log("Blog list: ");
  Blog.find({}).then((result) => {
    result.forEach((blog) => {
      console.log(`${blog.title} ${blog.author} ${blog.url} ${blog.likes}`);
    });
    mongoose.connection.close();
  });
}
