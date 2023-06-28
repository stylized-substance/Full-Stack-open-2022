import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

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


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
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
      const anecdoteToVote = [...state].find(anecdote => anecdote.id === action.payload)
      const anecdoteAfterVoting = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== anecdoteToVote.id ? anecdote : anecdoteAfterVoting)
    },
    appendAnecdote(state, action) {
      const content = action.payload
      const newAnecdote = {
        content: content,
        id: getId(),
        votes: 0
      }
      const pushResult = state.push(newAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addNew, voteAction, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = {
      content: content,
      id: getId(),
      votes: 0
    }
    await anecdoteService.createNew(content)
    dispatch(appendAnecdote(content))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const allAnecdotes = await anecdoteService.getAll()
    const anecdoteToVote = allAnecdotes.find(anecdote => anecdote.id === id)
    const votedAnecdote = await anecdoteService.vote(anecdoteToVote)
    dispatch(voteAction(id))
  }
}

export default anecdoteSlice.reducer
