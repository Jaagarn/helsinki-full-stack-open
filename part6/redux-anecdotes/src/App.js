import AnecdoteForm from "./components/AnecdoteForm.js";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter.js";
import Notification from "./components/Notification.js";

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
