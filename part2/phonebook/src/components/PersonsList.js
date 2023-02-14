import React from 'react'

const PersonsList = ({ name, number }) => {
    return (
    <ul>
        <li>
        {name} {number}
        </li>
    </ul>
    )
  }

export default PersonsList