import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const respone = await axios.get(baseUrl);
  return respone.data;
};

export const postOneAnecdote = async (anecdoteContent) => {
  const anecdote = { content: anecdoteContent.content, votes: 0 };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};
