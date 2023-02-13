import React from 'react';
import { useState } from 'react'

const PersonsList = ({ name, number }) => {
  return (
  <li>
    {name} {number}
  </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '666', id: 1 },
    { name: 'Test Name', number: '999', id: 2}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [personsToDisplay, setPersonsToDisplay] = useState(persons)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      important: Math.random() < 0.5,
      id: persons.length + 1,
    }

    const nameArray = persons.map(person => person.name)
    if (nameArray.includes(newName)) {
      alert(`"${newName}" already exists in phonebook`);
    } else {
      setPersons(persons.concat(nameObject))
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
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <div>debug: {newNumber}</div>
      <div>debug: filtertext =  {filterText}</div> 
      <h2>Phonebook</h2>
      
      <form onSubmit={addName}>
        <h3>Filter by name: </h3>
          <input value={filterText} onChange={handleFilterTextChange} />
        <h3>Add new</h3>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} /> 
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Persons</h2>
      <ul>
        {personsToDisplay.map(person =>
          <PersonsList name={person.name} number={person.number} key={person.id} />
        )}
      </ul>
    </div>
  )
}

export default App