import React from 'react';
import { useState } from 'react'

const Number = ({ name, key }) => {
  console.log(key);
  return (
  <li key={key}>
    {name}
  </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', id: '1' }
  ]) 

  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      content: newName,
      important: Math.random() < 0.5,
      id: persons.length + 1,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    console.log('button clicked, event.target')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
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
      ...
    </div>
  )
}

export default App