import React from 'react'
import ServerCommunicator from '../services/ServerCommunicator'

const PersonsList = ({ persons, deletePerson }) => {
    return (
        <ul>
            {persons.map(person =>
            <li className="person" key={person.id}>
                {person.name} {person.number} {""}
                <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
            </li>
            )}
        </ul>
    )
}

export default PersonsList