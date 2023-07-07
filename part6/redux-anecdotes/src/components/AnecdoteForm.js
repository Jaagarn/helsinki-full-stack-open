import { useDispatch } from "react-redux";
import { useState } from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const [newAnecdoteContent, setNewAnecdoteContent] = useState("");
  const dispatch = useDispatch();

  const createNewAnecdote = (event) => {
    event.preventDefault();
    dispatch(createAnecdote(newAnecdoteContent));
    setNewAnecdoteContent("");
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
