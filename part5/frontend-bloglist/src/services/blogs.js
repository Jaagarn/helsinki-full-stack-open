import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const request = await axios.get(baseUrl, config);
    const blogs = request.data.map((blog) => blog);
    console.log("the blogs are: ", blogs)
    return blogs;
  } catch (error) {
    console.log("Get for blogs api failed: ", error);
    return;
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken };
