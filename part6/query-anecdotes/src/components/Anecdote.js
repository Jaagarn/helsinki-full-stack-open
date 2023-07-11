import { useMutation, useQueryClient } from "react-query";
import { putUpvoteAnecdote } from "../services/anecdote";
import { useNotificationDispatch } from "../reducer/notificationContext";

const Anecdote = ({ anecdote }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newUpvoteMutation = useMutation(putUpvoteAnecdote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("anecdotes");
      notificationDispatch({ type: "SET", payload: `You upvoted "${data.content}"!` });
      console.log(data.content)
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
