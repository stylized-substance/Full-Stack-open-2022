import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonsList from './components/PersonsList'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'
import ServerCommunicator from './services/ServerCommunicator';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [personsToDisplay, setPersonsToDisplay] = useState(persons)

  useEffect(() => {
    ServerCommunicator
      .getPersons()
      .then(response => {
        setPersons(response)
        setPersonsToDisplay(response)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      alert(`"${newName}" already exists in phonebook`);
    } else {
      ServerCommunicator
        .createPerson(newName)
        .then(response => {
        setPersonsToDisplay(personsToDisplay.concat(response))
      })
      setNewName('')
      setNewNumber('')
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      ServerCommunicator
      .deletePerson(id)
      .then(response => {
        console.log(response, `deleted ${name}`)
        ServerCommunicator
      .getPersons()
      .then(response => {
        setPersons(response)
        setPersonsToDisplay(response)
      })
      })
      }
    } 

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterTextChange = (event) => {
    setFilterText(event.target.value)
    setPersonsToDisplay(persons.filter(person => person.name.toLowerCase().includes(event.target.value)))
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <div>debug: {newNumber}</div>
      <div>debug: filtertext =  {filterText}</div>

      <h2>Phonebook</h2>
      <h3>Filter by name: </h3>
        <FilterForm filterText={filterText} handleFilterTextChange={handleFilterTextChange} />
      <h3>Add new</h3>
        <PersonForm
          addName={addName}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      <h2>Persons</h2>
        <PersonsList personsToDisplay={personsToDisplay} deletePerson={deletePerson} />
    </div>
  )
}

export default App