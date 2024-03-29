import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
  return axios.get(baseUrl)
    .then(res => res.data)
}

export const createAnecdote = async newAnecdote => {
  await axios.post(baseUrl, newAnecdote).then(res => res.data)
}

export const voteAnecdote = ({ votedAnecdote }) => {
  return axios.put(`${baseUrl}/${votedAnecdote.id}`, votedAnecdote)
    .then(res => res.data)
}