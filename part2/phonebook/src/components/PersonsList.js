import React from 'react'

const PersonsList = ({ personsToDisplay }) => {
    return (
        <ul>
            {personsToDisplay.map(person =>
            <li key={person.id}>
                {person.name} {person.number}
            </li>
            )}
        </ul>
    )
}

export default PersonsList