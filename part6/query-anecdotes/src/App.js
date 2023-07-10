import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import Anecdote from "./components/Anecdote"

import { useQuery } from "react-query";
import { getAnecdotes } from "./services/anecdote";

const App = () => {

  const result = useQuery("anecdotes", getAnecdotes, {
    retry: 1,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return (
      <span>anecdote service not available due to problems in server</span>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <Anecdote anecdote={anecdote}/>
        </div>
      ))}
    </div>
  );
};

export default App;
