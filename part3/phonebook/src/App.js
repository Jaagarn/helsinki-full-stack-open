import { useState, useEffect } from "react";

import { Filter, PersonForm, Persons } from "./components/Components";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);

  const hook = () => {
    personService.getAll().then((intitalPeople) => {
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
            setNotificationMessage(
              `'${updatedPerson.name}' has new number ${updatedPerson.number}`
            );
            setTimeout(() => {
              setNotificationMessage(null);
            }, 5000);
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
        setNotificationMessage(`'${returnedPerson.name}' was added`);
        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch((error) => {
        setErrorMessage(`Error from database:\n ${error.response.data.error}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 10000);
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
        .catch(() => {
          setErrorMessage(
            `'${personToDelete}' was already removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setPersons(persons.filter((n) => n.id !== id));
        })
        .then(() => {
          setPersons(persons.filter((n) => n.id !== id));
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
      <Notification className="error" message={errorMessage} />
      <Notification className="notification" message={notificationMessage} />
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
