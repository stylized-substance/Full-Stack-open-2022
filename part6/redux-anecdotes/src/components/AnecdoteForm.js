import { useDispatch } from 'react-redux'
import { addNew } from '../reducers/anecdoteReducer'
import { voteNotification, addNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'
const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addNew(content))
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000);
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm