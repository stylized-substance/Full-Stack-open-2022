import React from 'react';
import { useState, useEffect } from 'react'
import PersonsList from './components/PersonsList'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'
import ServerCommunicator from './services/ServerCommunicator';
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [personsToDisplay, setPersonsToDisplay] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    ServerCommunicator
      .getPersons()
      .then(response => {
        setPersons(response)
        setPersonsToDisplay(response)
      })
  }, [notificationMessage])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
    }

    const thisPerson = persons.filter(person => person.name === nameObject.name)

    if (persons.map(person => person.name).includes(newName)) {
      if (window.confirm(`"${newName}" already exists in phonebook, update number?`)) {
        ServerCommunicator
          .updatePerson(thisPerson[0].id, nameObject)
          .then(response => {
            ServerCommunicator
              .getPersons()
              .then(response => {
                setPersons(response)
              })
            setNotificationMessage(`Updated number for ${response.name}`)
            setNotificationType('success')
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationMessage(`${newName} has already been deleted from server`)
            setNotificationType('error')
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
      }
    } else {
      ServerCommunicator
        .createPerson(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNotificationMessage(`Added ${response.name} to phonebook`)
          setNotificationType('success')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setNotificationMessage(`Person name is shorter than minimum allowed (3 characters)`)
          setNotificationType('error')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }

    setNewName('')
    setNewNumber('')
    return (
      <Notification message={notificationMessage} notificationType={notificationType} />
    )
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      ServerCommunicator
        .deletePerson(id)
        .then(() => {
          setPersonsToDisplay(persons.filter(person => person.id !== id))
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
    setPersonsToDisplay(persons.filter(person => person.name.toLowerCase().includes(filterText.toLowerCase())))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} notificationType={notificationType} />
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