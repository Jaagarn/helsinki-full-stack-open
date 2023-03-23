import { useState, useEffect } from "react";

import { Filter, PersonForm, Persons } from "./components/Components";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const hook = () => {
    personService
      .getAll()
      .then((intitalPeople) => {
        setPersons(intitalPeople);
      });
  };

  useEffect(hook, []);

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
      const changeNumberConfirmed = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      if (changeNumberConfirmed) {
        const updatedPersonObject = {
          ...newPersons.find((person) => person.name === newName),
          number: newNumber,
        };

        personService
          .updatePersonByObject(updatedPersonObject)
          .then((updatedPerson) => {

            const updatedNewPersons = newPersons.map((newPerson) =>
              newPerson.id === updatedPerson.id ? updatedPerson : newPerson
            );

            setPersons(updatedNewPersons);
            setNewName("");
            setNewNumber("");
          });
      }

      return;
    }

    const newId = newPersons[newPersons.length - 1].id.valueOf() + 1;

    const personObject = {
      name: newName,
      number: newNumber,
      id: newId,
    };

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(newPersons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
  };

  const handleDeletePersonClick = (id) => {
    const personToDelete = persons
      .find((person) => person.id === id)
      .name.valueOf();

    const deleteConfirmed = window.confirm(
      `Do you want to delete ${personToDelete}?`
    );

    if (deleteConfirmed) {
      personService
        .deleteById(id)
        .then(() => {
          personService
            .getAll()
            .then((persons) => {
              setPersons(persons);
            });
      });
    }
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
      <Persons
        persons={persons}
        filter={filter}
        handleOnDeletePersonClick={handleDeletePersonClick}
      />
    </div>
  );
};

export default App;
