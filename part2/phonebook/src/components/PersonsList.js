import React from 'react'

const PersonsList = ({ personsToDisplay, deletePerson }) => {
    if (personsToDisplay != null) {
        return (
            <ul>
                {personsToDisplay.map(person =>
                <li className="person" key={person.id}>
                    {person.name} {person.number} {""}
                    <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
                </li>
                )}
            </ul>
        )
    }
}

export default PersonsList