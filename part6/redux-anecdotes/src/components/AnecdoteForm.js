import { useDispatch } from "react-redux";
import { useState } from "react";
import  anecdoteService  from "../services/anecdoteService";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const [newAnecdoteContent, setNewAnecdoteContent] = useState("");
  const dispatch = useDispatch();

  const createNewAnecdote = async (event) => {
    event.preventDefault();
    const newAnecdote = await anecdoteService.postOne(newAnecdoteContent);
    dispatch(appendAnecdote(newAnecdote));
    setNewAnecdoteContent("");
    dispatch(clearNotification());
    dispatch(setNotification(`you added anecdote: '${newAnecdoteContent}'`));
  };

  const handleOnNewAnecdoteContentChanged = (event) => {
    setNewAnecdoteContent(event.target.value);
  };

  return (
    <div>
      <h2>create new</h2>
      <form>
        <input
          value={newAnecdoteContent}
          onChange={handleOnNewAnecdoteContentChanged}
        />
        <button type="submit" onClick={createNewAnecdote}>
          create
        </button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
