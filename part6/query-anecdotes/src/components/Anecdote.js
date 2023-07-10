import { useMutation, useQueryClient } from "react-query";
import { putUpvoteAnecdote } from "../services/anecdote";

const Anecdote = ({ anecdote }) => {
  const queryClient = useQueryClient();
  const newUpvoteMutation = useMutation(putUpvoteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const handleVote = (id) => {
    newUpvoteMutation.mutate(id);
    console.log(id);
  };

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote.id)}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
