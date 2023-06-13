import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addNew(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    },
    voteAction(state, action) {
      console.log(action.payload.votes++)
      const anecdoteToVote = [...state].find(anecdote => anecdote.id === action.payload)
      anecdoteToVote.votes++
      const anecdoteAfterVoting = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== anecdoteToVote.id ? anecdote : anecdoteAfterVoting)
    }
  }
})

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE': {
      const anecdoteToVote = state.find(anecdote => anecdote.id === action.payload.id)
      const anecdoteAfterVoting = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== anecdoteToVote.id ? anecdote : anecdoteAfterVoting)
    }
    case 'ADD': {
      return [
        ...state,
        action.payload
      ]
    }
    default:
      return state
  }
}

// export const voteAction = (id) => {
//   return {
//     type: 'VOTE',
//     payload: {
//       id: id
//     }
//   }
// }

// export const addNew = (content) => {
//   console.log('addnew function content:', content)
//   return {
//     type: 'ADD',
//     payload: {
//       content: content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

export const { addNew, voteAction } = anecdoteSlice.actions

export default anecdoteSlice.reducer
