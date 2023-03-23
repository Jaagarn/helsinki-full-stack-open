import { useState } from "react";

const Filter = ({ filter, handleOnChangedFilter }) => {
  return (
    <>
      <p>
        filter shown with{" "}
        <input type="search" value={filter} onChange={handleOnChangedFilter} />
      </p>
    </>
  );
};

const PersonForm = ({
  addPerson,
  newName,
  handleOnChangedNewName,
  newNumber,
  handleOnChangedNewNumber,
}) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleOnChangedNewName} />
        </div>
        <div>
          number:{" "}
          <input value={newNumber} onChange={handleOnChangedNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Person = ({ person }) => {
  return (
    <>
      <p>
        {person.name} {person.number}
      </p>
    </>
  );
};

const Persons = ({ persons, filter }) => {
  return (
    <>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <Person key={person.id} person={person} />
        ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567", id: 1 },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    if (newName === "" || newNumber === "") {
      window.alert(`Name and/or number empty`);
      return;
    }

    const newPersons = [...persons];

    const newNameAlreadyIncluded = newPersons
      .map((person) => person.name)
      .includes(newName);

    if (newNameAlreadyIncluded) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }

    newPersons.push({
      name: newName,
      number: newNumber,
      id: newPersons.length + 1,
    });

    setPersons(newPersons);
    setNewName("");
    setNewNumber("");
  };

  const handleOnChangedNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleOnChangedNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleOnChangedFilter = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleOnChangedFilter={handleOnChangedFilter} />
      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleOnChangedNewName={handleOnChangedNewName}
        newNumber={newNumber}
        handleOnChangedNewNumber={handleOnChangedNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
