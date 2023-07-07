import { useSelector, useDispatch } from "react-redux";
import { upVoteAnecdote } from "../reducers/anecdoteReducer";
const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    return state.anecdotes
      .map((anecdotes) => anecdotes)
      .filter((anecdotes) => anecdotes.content.toLowerCase().includes(state.filter.toLowerCase()));
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(upVoteAnecdote(id));
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
