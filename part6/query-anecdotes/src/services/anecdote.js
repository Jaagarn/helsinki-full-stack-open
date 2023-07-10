import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  const respone = await axios.get(baseUrl);
  return respone.data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export const postOneAnecdote = async (anecdoteContent) => {
  const anecdote = { content: anecdoteContent, votes: 0 };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

export const putUpvoteAnecdote = async (id) => {
  const anecdote = await getById(id);
  const upvotedAnecdote = {
    content: anecdote.content,
    votes: anecdote.votes + 1,
    id: anecdote.id,
  };
  
  const response = await axios.put(`${baseUrl}/${id}`, upvotedAnecdote);
  return response.data;
};
