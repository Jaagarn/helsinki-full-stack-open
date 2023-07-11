import { useMutation, useQueryClient } from "react-query";
import { postOneAnecdote } from "../services/anecdote";
import { useNotificationDispatch } from "../reducer/notificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(postOneAnecdote, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("anecdotes");
      notificationDispatch({
        type: "SET",
        payload: `You added anecdote "${data.content}"!`,
      });
    },
    onError: (error) => {
      notificationDispatch({ type: "SET", payload: `Error encountered when trying to create a new anecdote: "${error.message}". Specific error if available: "${error.response.data.error}"` });
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
    console.log("new anecdote");
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
