import React from 'react'

const PersonForm = ({ addName, filterText, handleFilterTextChange, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return (
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
    )
}

export default PersonForm