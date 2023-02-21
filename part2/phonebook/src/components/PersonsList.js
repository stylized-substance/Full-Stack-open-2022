import React from 'react'
import ServerCommunicator from '../services/ServerCommunicator'

const PersonsList = ({ personsToDisplay }) => {
    return (
        <ul>
            {personsToDisplay.map(person =>
            <li key={person.id}>
                {person.name} {person.number}
            <button onClick={() => ServerCommunicator.deletePerson(person.id)}>Delete</button>
            </li>
            )}
        </ul>
    )
}

export default PersonsList