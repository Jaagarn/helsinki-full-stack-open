import { useSelector, useDispatch } from "react-redux";
import { upVoteAnecdote } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  setNotification,
} from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes
      .map((anecdotes) => anecdotes)
      .filter((anecdotes) =>
        anecdotes.content.toLowerCase().includes(state.filter.toLowerCase())
      );
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    console.log("vote", anecdote.id);
    dispatch(upVoteAnecdote(anecdote.id));
    dispatch(clearNotification());
    dispatch(setNotification(`you voted for: '${anecdote.content}'`));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div
          key={anecdote.id}
          style={{
            margin: 10,
            border: "solid",
            padding: 5,
            borderWidth: 2,
            backgroundColor: "lightgray",
            width: "fit-content",
          }}
        >
          <div>{anecdote.content}</div>
          <div style={{ marginTop: 5, fontWeight: "bold" }}>
            has {anecdote.votes}
            <button style={{ marginLeft: 10 }} onClick={() => vote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
