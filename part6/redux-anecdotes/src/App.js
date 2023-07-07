import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { createAnecdote, upVoteAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
  const [newAnecdoteContent, setNewAnecdoteContent] = useState("");
  const anecdotes = useSelector((state) => state);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(upVoteAnecdote(id));
  };

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
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
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

export default App;
