import React from 'react'

const FilterForm = ({ filterText, handleFilterTextChange }) => {
    return (
        <form>
            <input value={filterText} onChange={handleFilterTextChange} />
        </form>
    )
}

export default FilterForm