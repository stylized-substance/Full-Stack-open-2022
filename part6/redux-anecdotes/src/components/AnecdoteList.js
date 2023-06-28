import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const state = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  const sortedByVotes = [...state].sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
    dispatch(voteNotification(content))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000);
  }

  return (
    <div>
      {sortedByVotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList