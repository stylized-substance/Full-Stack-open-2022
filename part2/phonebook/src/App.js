import React from 'react';
import { useState } from 'react'

const Number = ({ name }) => {
  return (
  <li>
    {name}
  </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 1 }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      important: Math.random() < 0.5,
      id: persons.length + 1,
    }

    const nameArray = persons.map(person => person.name)
    if (nameArray.includes(nameObject.name)) {
      alert('Name already exists in phonebook');
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')    
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <div>debug: {persons[0].name}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Number name={person.name} key={person.id} />
        )}
      </ul>
    </div>
  )
}

export default App