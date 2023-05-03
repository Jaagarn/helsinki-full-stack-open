import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const postNewBlog = async (title, author, url) => {
  const newBlog = {
    title: title,
    author: author,
    url: url,
    likes: 0,
  };

  const config = {
    headers: { Authorization: token },
  };

  try {
    const response = await axios.post(baseUrl, newBlog, config);
    return response;
  } catch (error) {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log("Error", error.message);
    }
  }
};

const getAll = async () => {
  if (token === null) {
    return;
  }

  const config = {
    headers: { Authorization: token },
  };

  try {
    const blogRequest = await axios.get(baseUrl, config);
    const blogs = blogRequest.data.map((blog) => blog);

    return blogs;
  } catch (error) {
    console.log("Get for blogs api failed: ", error);
    return;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, postNewBlog, setToken };
