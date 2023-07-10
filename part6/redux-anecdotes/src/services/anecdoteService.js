import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const postOne = async (anecdoteContent) => {
  const anecdote = { content: anecdoteContent, votes: 0 };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, postOne };
