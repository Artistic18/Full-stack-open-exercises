import React, { useEffect, useState } from 'react'
import Persons from './modules/Persons'
import InputData from './modules/InputData';
import PersonForm from './modules/PersonForm';
import Alert from './modules/Alert';
import servicePerson from './services/persons';
import './App.css';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ filterNames, setFilterNames ] = useState(null);
  const [ alert, setAlert ] = useState(null);

  useEffect(() => {
    servicePerson.getAll().then((p) => {
      setPersons(p);
    })
  }, []);


  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };


  const handleFilter = (event) => {
    setFilter(event.target.value);
    const filtered_list = persons.filter((person) => 
      person.name.toLowerCase().includes(event.targer.value.toLowerCase())
    )
    setFilterNames(filtered_list);
  };

  const addEntry = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };
    const exists = persons.some((person) => persons.name === newName);

    if(newName === "")
      return;
    
      if(exists){
        const person = persons.find((entry) => entry.name === newName);
        const changedPerson = {...person, number: newNumber};
        const {id} = person;

        if(newNumber < 8) {
           setAlert({error: `${newNumber} is too short, please enter a valid number`});
           setTimeout(() =>{
             setAlert(null);
           }, 5000);
           return;
        }

        const confirm = window.confirm(`${newNumber} is already added, replace it?`);
        if(confirm){
           servicePerson.update(id, changedPerson).then((returned) => {
             setPersons(persons.map((person) => person.id !== id? person : returned ));
             setAlert({notification: `Updated number for ${person.name}`});
             setTimeout(() => {
               setAlert(null);
             }, 5000);
           })
           .catch((error) => {
                setAlert({error: `${person.name} already removed from server`});
                setPersons(persons.filter((p) => p.id !== id));
                setTimeout(() => {
                  setAlert(null)
                },5000)
           });
        }
        setNewName("");
        setNewNumber("");
        return;
      }
      servicePerson
        .create(newPerson)
        .then((returned) => {
          setPersons(persons.concat(returned));
          setAlert({notification: `Added ${returned.name} to list.`});
          setTimeout(() => {
            setAlert(null);
          },5000);
          setNewNumber("");
          setNewName("");
        }).catch((error) => {
          setAlert(error.response.data);
          setTimeout(() => {
            setAlert(null);
          },5000)
        });
    
  };

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    const confirmDelete = window.confirm(`Delete ${person.name}?`);
    if(confirmDelete){
      servicePerson.deletePerson(id).then(() => {
        const filterNames = persons.filter((person) => person.id !== id);
        setPersons(filterNames);

        setFilter("");
      });
    }
  };

  return (
    <div className="container">
      <div>
           <h1>Phonebook</h1>
           <Alert message={alert?.notification || alert?.error} className={alert?.notification?"notification":"error"}/>
           <InputData label="Filter data" if="filter" type="text" value={filter} onChange={handleFilter}/>
           <h2>Add a new</h2>
           <PersonForm onSubmit={addEntry} newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber}/>
           <h2>Numbers</h2>
           <Persons filter={filter} persons={persons} filterNames={filterNames} handleDelete={handleDelete}/>
      </div>     
    </div>
  )
}

export default App