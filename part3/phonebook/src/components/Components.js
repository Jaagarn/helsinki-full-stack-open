export const Filter = ({ filter, handleOnChangedFilter }) => {
  return (
    <>
      <p>
        filter shown with{" "}
        <input type="search" value={filter} onChange={handleOnChangedFilter} />
      </p>
    </>
  );
};

export const PersonForm = ({
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
        <div style={{ marginTop: 10 }}>
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

const Person = ({ person, handleOnDeletePersonClick }) => {
  return (
    <>
      <p>
        {person.name} {person.number}
        <button
          style={{ marginLeft: 10 }}
          onClick={() => handleOnDeletePersonClick(person.id)}
        >
          delete
        </button>
      </p>
    </>
  );
};

export const Persons = ({ persons, filter, handleOnDeletePersonClick }) => {
  return (
    <>
      {persons
        .filter((person) => person.name.toLowerCase().includes(filter))
        .map((person) => (
          <Person
            key={person.id}
            person={person}
            handleOnDeletePersonClick={handleOnDeletePersonClick}
          />
        ))}
    </>
  );
};
