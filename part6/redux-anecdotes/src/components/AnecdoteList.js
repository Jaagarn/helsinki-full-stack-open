import { useSelector, useDispatch } from "react-redux";
import { upvoteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes
      .map((anecdotes) => anecdotes)
      .filter((anecdotes) =>
        anecdotes.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort((a, b) => a.votes < b.votes);
  });

  const dispatch = useDispatch();

  const vote = async (anecdote) => {
    console.log("vote", anecdote.id);
    dispatch(upvoteAnecdote(anecdote.id));
    dispatch(setNotification(`you voted for: '${anecdote.content}'`, 10000));
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
