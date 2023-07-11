import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: initialState,
  reducers: {
    //The payload is an anecdote in json format
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      return state.map((anecdote) =>
        anecdote.id === action.payload.id
          ? action.payload
          : anecdote
      );
    },
    //The payload is all anecdotes in the "database"
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { updateAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAll();
    dispatch(setAnecdotes(notes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newNote = await anecdoteService.postOne(content);
    dispatch(appendAnecdote(newNote));
  };
};

export const upvoteAnecdote = (id) => {
  return async (dispatch) => {
    const upvotedAnecdone = await anecdoteService.putUpvoteById(id);
    dispatch(updateAnecdote(upvotedAnecdone));
  };
};

export default anecdoteSlice.reducer;
