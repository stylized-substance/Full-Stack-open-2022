import React from 'react'
import ServerCommunicator from '../services/ServerCommunicator'

const PersonsList = ({ personsToDisplay, deletePerson }) => {
    return (
        <ul>
            {personsToDisplay.map(person =>
            <li key={person.id}>
                {person.name} {person.number} {""}
                <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
            </li>
            )}
        </ul>
    )
}

export default PersonsList