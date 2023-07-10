import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdoteService";

const initialState = [];

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: initialState,
  reducers: {
    createAnecdote(state, action) {
      // The payload is the new anecdotes content
      state.push(action.payload);
    },
    upVoteAnecdote(state, action) {
      // The payload is the id of the anecdote that is getting an update
      return state.map((anecdote) =>
        anecdote.id === action.payload
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
    //The payload is an anecdote in json format
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    //The payload is all anecdotes in the "database"
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { upVoteAnecdote, appendAnecdote, setAnecdotes } =
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

export default anecdoteSlice.reducer;
