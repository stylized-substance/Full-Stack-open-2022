import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import PersonsList from './components/PersonsList'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [personsToDisplay, setPersonsToDisplay] = useState(persons)

  const nameArray = persons.map(person => person.name)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      important: Math.random() < 0.5,
      id: persons.length + 1,
    }

    if (nameArray.includes(newName)) {
      alert(`"${newName}" already exists in phonebook`);
    } else {
      setPersons(persons.concat(nameObject))
      setPersonsToDisplay(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')    
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
        <PersonsList personsToDisplay={personsToDisplay} />
    </div>
  )
}

export default App