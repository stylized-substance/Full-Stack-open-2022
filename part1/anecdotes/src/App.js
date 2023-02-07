import React from 'react';
import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Display = ({anecdote, points, highestVoted, highestVoteCount}) => {
  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      <p>
        {anecdote}
      </p>
      <p>
        Votes: {points}
      </p>
      <h1>
        Anecdote with most votes
      </h1>
      <p>
        <i>
          {highestVoted}
        </i>
      </p>
      <p>
        Has {highestVoteCount} votes.
      </p>
    </div>
  )
}

const randomNumberGenerator = (min, max) => {
  return Math.floor((Math.random() * (max - min) + min))
}

const pointsArray = new Uint8Array(8)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(pointsArray)

  const handleNextButtonClick = () => {
    setSelected(randomNumberGenerator(0, 7))
  }

  const handleVoteButtonClick = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)    
  }

  const highestVoteCount = Math.max(...points)

  const highestVotedIndex = points.indexOf(highestVoteCount)

  return (
    <div>
      <Button handleClick={handleNextButtonClick} text="Click for next anecdote" />
      <Button handleClick={handleVoteButtonClick} text="Vote" />
      <Display anecdote={anecdotes[selected]} points={points[selected]} highestVoted={anecdotes[highestVotedIndex]} highestVoteCount={highestVoteCount} />
    </div>
  )  
}

export default App