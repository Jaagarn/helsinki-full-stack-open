const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length == 0) {
    return 0;
  }

  let totalLikes = 0;

  blogs.forEach((blog) => (totalLikes += blog.likes));

  return totalLikes;
};

const favoriteBlog = (blogs) => {
  if (blogs.length == 0) {
    return {
      title: null,
      author: null,
      likes: null,
    };
  }

  let mostLikes = 0;
  let mostLikesIndex = 0;
  let index = 0;

  blogs.forEach((blog) => {
    if (blog.likes > mostLikes) {
      mostLikes = blog.likes;
      mostLikesIndex = index;
    }
    index++;
  });

  return {
    title: blogs[mostLikesIndex].title,
    author: blogs[mostLikesIndex].author,
    likes: blogs[mostLikesIndex].likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length == 0) {
    return {
      author: null,
      blogs: null,
    };
  }

  const mapOfAuthors = new Map();

  blogs.forEach((blog) => {
    if (mapOfAuthors.has(blog.author)) {
      let blogs = mapOfAuthors.get(blog.author) + 1;
      mapOfAuthors.set(blog.author, blogs);
    } else {
      mapOfAuthors.set(blog.author, 1);
    }
  });

  // Converts the map to a list of [key, value] lists then iterates through that list to find the highest value
  const mostLikesEntry = [...mapOfAuthors.entries()].reduce((x, y) =>
    y[1] > x[1] ? y : x
  );

  return {
    author: mostLikesEntry[0],
    blogs: mostLikesEntry[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length == 0) {
    return {
      author: null,
      likes: null,
    };
  }

  const mapOfAuthors = new Map();

  blogs.forEach((blog) => {
    if (mapOfAuthors.has(blog.author)) {
      let likes = blog.likes + mapOfAuthors.get(blog.author);
      mapOfAuthors.set(blog.author, likes);
    } else {
      mapOfAuthors.set(blog.author, blog.likes);
    }
  });

  // Converts the map to a list of [key, value] lists then iterates through that list to find the highest value
  const mostLikesEntry = [...mapOfAuthors.entries()].reduce((x, y) =>
    y[1] > x[1] ? y : x
  );

  return {
    author: mostLikesEntry[0],
    likes: mostLikesEntry[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
